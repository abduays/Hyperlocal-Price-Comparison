#!/usr/bin/env bash
set -euo pipefail

# Use this only when a merge/rebase is in progress and these files are conflicted.
# It keeps the hyperlocal MVP implementation from this branch.

FILES=(
  "README.md"
  "backend/index.js"
  "backend/package.json"
  "index.html"
)

for file in "${FILES[@]}"; do
  if git ls-files -u -- "$file" | grep -q .; then
    git checkout --ours -- "$file"
    git add "$file"
    echo "Resolved with ours: $file"
  else
    echo "No conflict for: $file"
  fi
done

echo "Done. If all conflicts are resolved, run:"
echo "  git commit"
