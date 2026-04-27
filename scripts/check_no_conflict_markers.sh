#!/usr/bin/env bash
set -euo pipefail

# Scan repository for unresolved git conflict markers.
# Excludes .git and node_modules.

if rg -n --hidden --glob '!.git/**' --glob '!**/node_modules/**' '^(<<<<<<<|=======|>>>>>>>)' .; then
  echo
  echo '❌ Conflict markers found. Remove them before commit.'
  exit 1
fi

# Block known bad branch-marker strings from being committed.
bad_one='codex/build-hyperlocal-service'
bad_one+="-matching-tool"
bad_two='codex/build-hyperlocal-service'
bad_two+="-matching-tool-qr54dm"
pattern="${bad_one}|${bad_two}"

if rg -n --hidden --glob '!.git/**' --glob '!**/node_modules/**' "$pattern" .; then
  echo
  echo '❌ Forbidden branch-marker strings found. Remove them before commit.'
  exit 1
fi

echo '✅ No conflict markers found.'
