#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  BM-77 Bookmark Manager${NC}"
echo -e "${BLUE}  Starting Development Servers${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if node is available
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js not found, trying to use nvm...${NC}"
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Kill any existing processes on ports 3001 and 5173
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
sleep 1

# Start backend
echo -e "${GREEN}Starting Backend Server on port 3001...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
echo -e "${YELLOW}Waiting for backend to start...${NC}"
sleep 3

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${YELLOW}Backend failed to start. Check backend logs.${NC}"
    exit 1
fi

# Start frontend
echo -e "${GREEN}Starting Frontend Server on port 5173...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Backend running at: http://localhost:3001${NC}"
echo -e "${GREEN}✓ Frontend running at: http://localhost:5173${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Wait for interrupt
trap "echo ''; echo -e '${YELLOW}Shutting down servers...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT
wait