$services = @{
    "Back-apigetway" = 8081
    "Back-contrat.1.1" = 8084
    "Back-Equipe" = 8082
    "Back-eurika" = 8761
    "Back-formation" = 8086
    "Back-node-service" = 8090
    "Back-ressource1.1" = 8083
    "Back-departement1.1" = 8085
    "Back-university1.1" = 8087
    "Back-config-server" = 8888
}

foreach ($service in $services.Keys) {
    $dockerfilePath = Join-Path -Path $service -ChildPath "Dockerfile"
    
    if (Test-Path $dockerfilePath) {
        Write-Host "Updating port for $service to $($services[$service])"
        (Get-Content $dockerfilePath) -replace 'EXPOSE 8080', "EXPOSE $($services[$service])" | Set-Content $dockerfilePath
    } else {
        Write-Host "Warning: Dockerfile not found for $service"
    }
}

Write-Host "All ports have been updated."
