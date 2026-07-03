#!/usr/bin/env bash
# SEO Monitor - cek meta title tiap jam, kirim alert kalau berubah
BASE="/mnt/data_d/Desktop/Domain Website/Azhar457.github.io"
SNAPSHOT="$BASE/.seo-snapshot"
CURRENT=$(grep '<title>' "$BASE/index.html" | sed 's/.*<title>//;s/<\/title>.*//')

mkdir -p "$(dirname "$SNAPSHOT")"
if [ -f "$SNAPSHOT" ]; then
    OLD=$(cat "$SNAPSHOT")
    if [ "$CURRENT" != "$OLD" ]; then
        echo "SEO ALERT: Title changed! Old: '$OLD' -> New: '$CURRENT'"
    fi
fi
echo "$CURRENT" > "$SNAPSHOT"
