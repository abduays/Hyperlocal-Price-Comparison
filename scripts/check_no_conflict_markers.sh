#!/usr/bin/env bash
set -euo pipefail

# Scan repository for unresolved git conflict markers.
# Excludes .git and node_modules.

if rg -n --hidden --glob '!.git/**' --glob '!**/node_modules/**' '^(<<<<<<<|=======|>>>>>>>)' .; then
  echo
  echo '❌ Conflict markers found. Remove them before commit.'
  exit 1
fi

echo '✅ No conflict markers found.'
