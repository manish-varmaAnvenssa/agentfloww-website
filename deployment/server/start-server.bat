@echo off
echo Starting Anvenssa Server with environment variables...

set PORT=5000
set MONGODB_URI=mongodb://localhost:27017/anvenssa
set JWT_SECRET=anvenssa-super-secret-jwt-key-2024
set CLIENT_URL=http://localhost:5173

echo Environment variables set:
echo PORT=%PORT%
echo MONGODB_URI=%MONGODB_URI%
echo JWT_SECRET=***hidden***
echo CLIENT_URL=%CLIENT_URL%

echo.
echo Starting server...
npm start

pause 