package com.example.apigetway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGetWayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGetWayApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes (RouteLocatorBuilder builder) {
		return builder.routes()
				.route("Contrat", r -> r.path("/Contrat/**")
						.uri("lb://CONTRAT"))//candidat:8056

				.route("universite", r -> r.path("/universite/**")
						.uri("lb://UNIVERSITE"))//universite:8057

				.route("Ressource", r -> r.path("/Ressource/**")
						.uri("lb://RESSOURCE"))//ressource:8083

				.route("departementMicroService", r -> r.path("/departementMicroService/**")
					.uri("lb://departementMicroService"))

				.route("formation", r -> r.path("/formation/**")
						.uri("lb://formation"))//formation:8089

				.route("equipe", r -> r.path("/equipe/**")
						.uri("lb://equipe"))//equipe:8082
				.route("departement", r -> r.path("/departement/**")
						.uri("lb://departement"))//departement:8085
				.route("node-service", r -> r.path("/node-service/**")
						.uri("lb://node-service"))//node-service:8090
				.build();
	}
}
