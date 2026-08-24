#!/bin/bash
# Merge R&D metrics system into AOA
# Safe merge with validation and rollback

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="$PROJECT_ROOT/.backup-$(date +%s)"
METRICS_SOURCE="${1:-.}"

echo "🔄 AOA R&D Metrics Merge"
echo "========================"

# Validate source
if [ ! -f "$METRICS_SOURCE/src/types/metrics.ts" ]; then
  echo "❌ Error: R&D metrics source not found at $METRICS_SOURCE"
  exit 1
fi

# Create backup
echo "📦 Backing up current files..."
mkdir -p "$BACKUP_DIR"
cp -r "$PROJECT_ROOT/src" "$BACKUP_DIR/src-backup" 2>/dev/null || true

# Copy files
echo "📋 Copying R&D metrics files..."
cp "$METRICS_SOURCE/src/types/metrics.ts" "$PROJECT_ROOT/src/types/"
cp "$METRICS_SOURCE/src/data/metricsHistory.ts" "$PROJECT_ROOT/src/data/"
cp "$METRICS_SOURCE/src/utils/metricsStorage.ts" "$PROJECT_ROOT/src/utils/"
cp "$METRICS_SOURCE/src/utils/metricsAnalysis.ts" "$PROJECT_ROOT/src/utils/"
cp "$METRICS_SOURCE/src/utils/metricsDataLayer.ts" "$PROJECT_ROOT/src/utils/"
cp "$METRICS_SOURCE/src/hooks/useMetrics.ts" "$PROJECT_ROOT/src/hooks/"
cp "$METRICS_SOURCE/src/examples/metricsUsageExample.ts" "$PROJECT_ROOT/src/examples/"

# Validate imports
echo "✅ Validating TypeScript imports..."
cd "$PROJECT_ROOT"
if ! npx tsc --noEmit 2>/dev/null; then
  echo "❌ TypeScript validation failed. Rolling back..."
  rm -rf "$PROJECT_ROOT/src"
  mv "$BACKUP_DIR/src-backup" "$PROJECT_ROOT/src"
  echo "✅ Rolled back to previous state"
  exit 1
fi

# Test build
echo "🔨 Testing production build..."
if ! npm run build 2>&1 | tail -5; then
  echo "❌ Build failed. Rolling back..."
  rm -rf "$PROJECT_ROOT/src"
  mv "$BACKUP_DIR/src-backup" "$PROJECT_ROOT/src"
  echo "✅ Rolled back to previous state"
  exit 1
fi

# Cleanup
rm -rf "$BACKUP_DIR"

echo ""
echo "✅ R&D Metrics Integration Complete!"
echo "📍 Backup saved (if needed): $BACKUP_DIR"
echo ""
echo "Next steps:"
echo "  1. Review the changes: git status"
echo "  2. Test locally: npm run dev"
echo "  3. Commit: git add . && git commit -m 'Integrate R&D metrics'"
echo "  4. Deploy: git push origin main"
