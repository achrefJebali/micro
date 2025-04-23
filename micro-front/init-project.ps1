# Init script for Angular project setup
Write-Host "Cleaning project before initialization..."

# Remove node_modules if exists
if (Test-Path -Path 'node_modules') {
    Write-Host "Removing old node_modules directory..."
    Remove-Item -Path 'node_modules' -Recurse -Force
}

# Remove package-lock.json if exists
if (Test-Path -Path 'package-lock.json') {
    Write-Host "Removing old package-lock.json..."
    Remove-Item -Path 'package-lock.json' -Force
}

# Clear NPM cache
Write-Host "Clearing npm cache..."
npm cache clean --force

# Install dependencies with force flag
Write-Host "Installing dependencies..."
npm install --force

# Check if installation was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!"
    Write-Host "Starting development server..."
    npm start
} else {
    Write-Host "There was an error installing dependencies."
    Write-Host "You can try to manually install them with: npm install --legacy-peer-deps"
}
