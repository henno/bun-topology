#!/usr/bin/env bash
# Kill any process running on port 8080

PORT=8080

# Find and kill process on port 8080
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
  echo "Killing existing server on port $PORT (PID: $PID)"
  kill -9 $PID 2>/dev/null || true
  sleep 1
fi

exit 0
