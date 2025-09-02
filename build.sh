#!/bin/bash

echo "🌲 Building TimberJ library..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Install dependencies if not present
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the library
echo "🔨 Building with TypeScript..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Output in dist/ directory"
    echo "📁 Build contents:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 TimberJ library build complete!"
