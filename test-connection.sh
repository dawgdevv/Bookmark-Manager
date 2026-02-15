#!/bin/bash

# Test script to verify frontend-backend connection

echo "Testing Bookmark Manager Connection..."
echo ""

# Test backend health endpoint
echo "1. Testing Backend Health..."
curl -s http://localhost:3001/api/health | jq . 2>/dev/null || echo "Backend not running or no jq installed"
echo ""

# Test getting bookmarks
echo "2. Testing GET /api/bookmarks..."
curl -s http://localhost:3001/api/bookmarks | jq '.data | length' 2>/dev/null || echo "Failed to fetch bookmarks"
echo ""

# Test creating a bookmark
echo "3. Testing POST /api/bookmarks..."
curl -s -X POST http://localhost:3001/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://test.com",
    "title": "Test Bookmark",
    "description": "Testing the API",
    "tags": ["test", "api"]
  }' | jq . 2>/dev/null || echo "Failed to create bookmark"
echo ""

echo "Connection test complete!"