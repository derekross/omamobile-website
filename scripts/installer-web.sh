#!/bin/bash
# The web installer's files at dist/install/web/app/, behind the switch in
# installer-web.env (docs/INSTALLER-WEB.md).
#
#   scripts/installer-web.sh status       print the switch and the pin, check the pin's form
#   scripts/installer-web.sh fetch DIST   with the switch on: download the pinned release
#                                         asset, check its SHA-256 and contents, and unpack
#                                         it into DIST/install/web/app/. With it off: nothing
#
# For a local check only, INSTALLER_WEB_TARBALL=FILE takes the asset from a
# file instead of the release; its SHA-256 must still match the pin. The
# deploy workflow never sets it.
set -euo pipefail

here=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
conf=$here/installer-web.env
REPO=derekross/omamobile-installer

die() { echo "installer-web: $*" >&2; exit 1; }

# Read the file as data, never as a script: only the three known keys
INSTALLER_WEB="" INSTALLER_WEB_TAG="" INSTALLER_WEB_SHA256=""
while IFS= read -r line || [[ -n $line ]]; do
  [[ -z $line || $line == \#* ]] && continue
  [[ $line =~ ^(INSTALLER_WEB|INSTALLER_WEB_TAG|INSTALLER_WEB_SHA256)=([A-Za-z0-9._-]*)$ ]] \
    || die "installer-web.env: a line that is not KEY=value with a known key: $line"
  printf -v "${BASH_REMATCH[1]}" '%s' "${BASH_REMATCH[2]}"
done <"$conf"

case $INSTALLER_WEB in
  off) ;;
  on)
    [[ $INSTALLER_WEB_TAG =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || die "INSTALLER_WEB_TAG must be a release tag such as v0.1.0, not '$INSTALLER_WEB_TAG'"
    [[ $INSTALLER_WEB_SHA256 =~ ^[0-9a-f]{64}$ ]] || die "INSTALLER_WEB_SHA256 must be 64 lowercase hex digits"
    ;;
  *) die "INSTALLER_WEB must be on or off, not '$INSTALLER_WEB'" ;;
esac

asset="omamobile-installer-web-$INSTALLER_WEB_TAG.tar.gz"
url="https://github.com/$REPO/releases/download/$INSTALLER_WEB_TAG/$asset"

cmd=${1:-}
case $cmd in
  status)
    if [[ $INSTALLER_WEB == off ]]; then
      echo "installer-web: off (nothing is fetched; /install/web/ is not built)"
    else
      echo "installer-web: on, $url"
      echo "installer-web: sha256 $INSTALLER_WEB_SHA256"
    fi
    ;;
  fetch)
    dist=${2:-}
    [[ -n $dist ]] || die "usage: scripts/installer-web.sh fetch DIST"
    if [[ $INSTALLER_WEB == off ]]; then
      echo "installer-web: off, nothing fetched"
      [[ ! -e $dist/install/web ]] || die "the switch is off, but $dist/install/web exists: the draft page was built anyway"
      exit 0
    fi
    [[ -f $dist/index.html ]] || die "$dist holds no built site; run the build first"
    dest=$dist/install/web/app
    [[ ! -e $dest ]] || die "$dest exists already: the site's own build must not use that path"

    work=$(mktemp -d)
    trap 'rm -rf "$work"' EXIT
    if [[ -n ${INSTALLER_WEB_TARBALL:-} ]]; then
      echo "installer-web: from the local file $INSTALLER_WEB_TARBALL (a local check, never the deploy)"
      cp -- "$INSTALLER_WEB_TARBALL" "$work/$asset"
    else
      echo "installer-web: downloading $url"
      curl --fail --location --silent --show-error --proto '=https' --tlsv1.2 \
        --retry 3 --max-filesize 104857600 -o "$work/$asset" "$url"
    fi

    got=$(sha256sum "$work/$asset" | cut -d' ' -f1)
    [[ $got == "$INSTALLER_WEB_SHA256" ]] || die "SHA-256 mismatch: $asset is $got, the pin is $INSTALLER_WEB_SHA256"
    echo "installer-web: sha256 matches the pin"

    # Every member a plain file or a directory under one top folder named
    # as the asset, no absolute path, no '..', no dotfile
    top=${asset%.tar.gz}
    tar -tvzf "$work/$asset" >"$work/long" || die "$asset is not a readable gzip tar archive"
    tar -tzf "$work/$asset" >"$work/names"
    while IFS= read -r entry; do
      kind=${entry:0:1}
      [[ $kind == - || $kind == d ]] || die "the archive holds something other than files and directories: $entry"
    done <"$work/long"
    while IFS= read -r name; do
      [[ $name == "$top" || $name == "$top/"* ]] || die "a member outside $top/: $name"
      [[ $name != /* && $name != *..* ]] || die "a member with an absolute path or '..': $name"
      [[ ${name#"$top"} != */.* ]] || die "a dotfile in the archive: $name"
    done <"$work/names"

    mkdir -p "$work/x"
    tar -xzf "$work/$asset" -C "$work/x" --no-same-owner --no-same-permissions
    app=$work/x/$top

    # What the installer's own CI checks of the page that ships, once more
    # on what is about to be served: the page, its module and its wasm, the
    # page's statement that it cannot write, and no pretend phone
    for f in index.html app.js release-fetch.js pkg/omamobile_installer_web.js pkg/omamobile_installer_web_bg.wasm; do
      [[ -s $app/$f ]] || die "the archive has no $f"
    done
    grep -q 'cannot write to a phone' "$app/index.html" || die "this is not the shipping build: its page does not say it cannot write to a phone"
    if grep -q fake_phone "$app/pkg/omamobile_installer_web.js"; then
      die "this build carries the pretend phone (a self-test build), not the shipping one"
    fi
    if [[ -e $app/preview.js || -e $app/write-walk.js ]] || ! grep -q 'src="app.js"' "$app/index.html"; then
      die "this is the write preview (preview.js), which never ships"
    fi

    mkdir -p "$(dirname "$dest")"
    cp -R "$app" "$dest"
    echo "installer-web: unpacked into $dest"
    find "$dest" -type f | sed "s|^$dist/|  |" | sort
    ;;
  *)
    die "usage: scripts/installer-web.sh status | fetch DIST"
    ;;
esac
