FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY . /app
RUN mvn package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8086
ENTRYPOINT ["java","-jar","app.jar"]
