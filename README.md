# omamobile.org

The website for [Omarchy Mobile](https://github.com/derekross/omarchy-mobile): native Omarchy on your phone, with a mainline kernel and no Android underneath.

The site will have:

- a landing page;
- the supported devices, with a page for each one, generated from the main repository's `docs/DEVICES.md`;
- the install guide and the way back to stock;
- docs for contributors and porters;
- project news, published on Nostr.

Later it will also have downloads and a web installer.

The first pages are built: the landing page, the device list and a page per device, and the news, built from the project's Nostr posts. Nothing is deployed.

```sh
npm ci
npm run dev        # http://localhost:4321
npm run news       # fetch the project's Nostr posts into nostr/events/
npm run build      # fetches the news, then builds the static site in dist/
```

The build reads `docs/DEVICES.md` from a checkout of the main repository, `../omarchy-mobile` by default (set `OMAMOBILE_REPO` to change it). [docs/DESIGN.md](docs/DESIGN.md) records the decisions so far.

## Rules for this repository

The repository is public, and so is everything the site says. Read [AGENTS.md](AGENTS.md) before you change copy or the installer.

## Licence

MIT, as for the main repository. Omarchy Mobile is a community project built on [Omarchy](https://github.com/basecamp/omarchy) (MIT). It is not an official Omarchy or Basecamp product.
