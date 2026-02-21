#!/bin/bash
# PostToolUse hook for Edit|Write — format and lint changed files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only process TypeScript/TSX files
case "$FILE_PATH" in
  *.ts|*.tsx|*.mts) ;;
  *) exit 0 ;;
esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Format
bunx oxfmt --write "$FILE_PATH" 2>/dev/null

# Lint (only portfolio files — they have the tsconfig)
case "$FILE_PATH" in
  */apps/portfolio/*)
    bunx oxlint --tsconfig apps/portfolio/tsconfig.json --nextjs-plugin --react-plugin -D correctness -D suspicious -A react-in-jsx-scope "$FILE_PATH"
    ;;
  *)
    bunx oxlint -D correctness -D suspicious "$FILE_PATH"
    ;;
esac
