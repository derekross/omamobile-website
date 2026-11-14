# The web installer on omamobile.org

How the installer's web page ([derekross/omamobile-installer](https://github.com/derekross/omamobile-installer), `web/`) reaches the site at `/install/web/app/`, with the draft page `/install/web/` in front of it. Everything here is **off** as committed. Turning it on is the maintainer's decision, after the installer repository's go-live checklist (`docs/GO-LIVE.md` there).

There are two independent pieces, and both must be on for the installer to reach a phone:

| Piece | Where | Who changes it | Off means |
| --- | --- | --- | --- |
| The files and the draft page | `installer-web.env` in this repository (`INSTALLER_WEB=on`, a tag, a SHA-256), read by the deploy | The maintainer, in a reviewed pull request | No `/install/web/` page, nothing under `/install/web/app/`; the site is as before |
| The header, `Permissions-Policy: usb=(self)` on `/install/web/app/` only | The server's nginx (`deploy/nginx/` here is the change, prepared) | The maintainer, by hand on the server with sudo | The page, if deployed, loads but the browser refuses it WebUSB: it cannot reach a phone |

Each fails closed without the other: files without the header are a page that can't see USB devices; the header without files is a path that answers 404.

## 1. The switch and the pin: `installer-web.env`

Three lines: `INSTALLER_WEB` (`off` or `on`), `INSTALLER_WEB_TAG` (an installer release tag, `vX.Y.Z`) and `INSTALLER_WEB_SHA256`.

- **Off** (as committed): `src/pages/install/[page].astro` builds no page (its `getStaticPaths` returns nothing), and `scripts/installer-web.sh fetch dist` fetches nothing and fails the build if `dist/install/web` exists anyway. Merging this changes nothing on the live site.
- **On**: the draft page `/install/web/` is built (`noindex`, not in the navigation), and the deploy step downloads `omamobile-installer-web-<TAG>.tar.gz` from that tag's GitHub release, refuses it unless its SHA-256 equals the pin, refuses an archive with anything but plain files and directories under one top folder (no `..`, no absolute paths, no dotfiles), checks that it is the shipping build (its page says it cannot write to a phone, its module has no pretend phone, it is not the write preview), and unpacks it into `dist/install/web/app/`. The rsync that follows deploys it with the rest of `dist/`.

The URL is made from the tag; the file cannot name another repository or host.

### Why a release asset, not a build from a pinned commit

- The deploy stays a Node job of a minute. Building the page needs the Rust toolchain of `rust-toolchain.toml`, the wasm32 target and `wasm-bindgen-cli` at the exact version in `Cargo.lock`: several minutes per deploy, every six hours, and a second place where the installer's build could drift from the installer's CI.
- What is served is byte for byte what the installer's release workflow built, checked (`tools/check-shipping --built`) and summed. The pin in this repository is the trust anchor: the release page's own `SHA256SUMS` is not trusted by itself, and a release asset replaced after the fact no longer matches the pin and stops the deploy.
- To check a pin before writing it here: the sum in the tagged release's `SHA256SUMS` must equal the one in the Release workflow run's own artifact for that tag, and, as a second opinion, a local `tools/release-web <TAG> <DIR>` on the tagged commit. That script packs reproducibly (sorted names, the commit's time, owner 0, gzip without a timestamp) and builds the module with its source paths remapped to fixed roots, so the same commit and toolchain give the same bytes; if a local build differs, trust neither until the difference is understood.

## 2. The header

The site's `Permissions-Policy` comes from the server, not from this repository: `/etc/nginx/snippets/security-headers.conf` on the server, included in every location of the `omamobile.org` vhost, sends `usb=()` on every page (seen on 2026-11-14 on `/` and on `/install/web/app/`). nginx doesn't read a headers file from the webroot, and `Permissions-Policy` can't be set from a `<meta>` tag, so the change has to be on the server.

Prepared here, applied by the maintainer:

- `deploy/nginx/security-headers-webusb.conf`: the shared snippet with one change, `usb=(self)`. A replacement, because a second `Permissions-Policy` header can't loosen the first.
- `deploy/nginx/omamobile.org-install-web-app.conf`: one `location ^~ /install/web/app/` block for the vhost's 443 server. `^~` keeps the vhost's regex locations (scripts, images, JSON) from answering for the installer's files with the shared snippet, and `try_files … =404` keeps the path from falling back to the site's `index.html` with `usb=(self)`.

Applying it (the maintainer, on the server; the server's own rules: dry check, verified reload, roll back on failure):

```sh
sudo cp security-headers-webusb.conf /etc/nginx/snippets/
sudo cp /etc/nginx/sites-available/omamobile.org /etc/nginx/sites-available/omamobile.org.bak-$(date +%Y%m%d-%H%M%S)
sudoedit /etc/nginx/sites-available/omamobile.org     # paste the location block into the 443 server, above `location /`
sudo nginx -t                                          # on failure: restore the .bak and stop
mark=$(wc -l < /var/log/nginx/error.log); sudo systemctl reload nginx; sleep 2
tail -n "+$((mark+1))" /var/log/nginx/error.log | grep -i emerg && echo "DID NOT APPLY"
```

Then, from any computer:

```sh
curl -sI https://omamobile.org/install/web/app/ | grep -i permissions-policy    # usb=(self), or a 404 before the files are deployed
curl -sI https://omamobile.org/ | grep -i permissions-policy                    # still usb=()
curl -sI https://omamobile.org/install/web/ | grep -i permissions-policy        # still usb=(): the draft page itself gets no USB
```

**Rollback:** restore the `.bak` file, `nginx -t`, verified reload. The snippet file can stay; nothing else includes it.

### Keeping the two snippets equal

`security-headers-webusb.conf` must stay the shared snippet with `usb=(self)` and nothing else different. On the server: `diff /etc/nginx/snippets/security-headers.conf /etc/nginx/snippets/security-headers-webusb.conf` shows only the comments and the `Permissions-Policy` line. When the shared one changes (a CSP change, say), change this one in the same sitting.

## 3. Order

1. The installer's go-live checklist has passed (its `docs/GO-LIVE.md`), and an installer release is tagged, with its web asset and `SHA256SUMS`, and published: the Release workflow makes a draft, and a draft's files can't be downloaded by the deploy.
2. The header on the server (section 2). Safe before the files: the path answers 404 until they are there.
3. A pull request here that sets `INSTALLER_WEB=on`, the tag and the SHA-256. Merged by the maintainer; the push deploys. The workflow warns if the header isn't there yet.
4. Check in a Chromium-based browser that `/install/web/app/` lists the phone in the WebUSB chooser.

To take it down again: `INSTALLER_WEB=off` in a pull request (the next deploy's `--delete` removes the files), and the header's rollback if wanted.

## 4. A local check

```sh
npm run build                                   # with the switch off: no dist/install/web
scripts/installer-web.sh fetch dist             # "off, nothing fetched"
```

With it on, against a local asset (built with the installer repository's release workflow steps, or its artifact): set `INSTALLER_WEB=on`, the tag and the asset's SHA-256 in `installer-web.env` (never commit that by accident), then

```sh
npm run build
INSTALLER_WEB_TARBALL=/path/to/omamobile-installer-web-vX.Y.Z.tar.gz scripts/installer-web.sh fetch dist
npm run preview                                 # /install/web/ and /install/web/app/
```

`astro preview` sends none of the server's headers, so WebUSB there follows the browser's defaults for `localhost`.
