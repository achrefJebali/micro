$directories = @(
    "Back-apigetway",
    "Back-contrat.1.1", 
    "Back-Equipe", 
    "Back-eurika", 
    "Back-formation", 
    "Back-node-service",
    "Back-ressource1.1",
    "Back-departement1.1",
    "Back-university1.1"
)

$dockerfileContent = @"
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY . /app
RUN mvn package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
"@

foreach ($dir in $directories) {
    $dockerfilePath = Join-Path -Path $dir -ChildPath "Dockerfile"
    
    if (Test-Path $dockerfilePath) {
        Write-Host "Updating Dockerfile in $dir"
        Set-Content -Path $dockerfilePath -Value $dockerfileContent
    } else {
        Write-Host "Creating Dockerfile in $dir"
        New-Item -Path $dockerfilePath -Value $dockerfileContent -Force
    }
}

Write-Host "All Dockerfiles have been updated. Please check port numbers in each Dockerfile manually."




