Write-Host "Starting Anvenssa Server with environment variables..." -ForegroundColor Green

$env:PORT = "5000"
$env:MONGODB_URI = "mongodb://localhost:27017/anvenssa"
$env:JWT_SECRET = "anvenssa-super-secret-jwt-key-2024"
$env:CLIENT_URL = "http://localhost:5173"

Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "PORT: $env:PORT"
Write-Host "MONGODB_URI: $env:MONGODB_URI"
Write-Host "JWT_SECRET: ***hidden***"
Write-Host "CLIENT_URL: $env:CLIENT_URL"

Write-Host ""
Write-Host "Starting server..." -ForegroundColor Green
npm start 