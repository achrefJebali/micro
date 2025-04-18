package tn.esprit.microservice.kassil.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import tn.esprit.microservice.kassil.entities.*;
import tn.esprit.microservice.kassil.repositories.EquipeRepository;

import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final EquipeRepository equipeRepository;

    @PostConstruct
    public void initData() {
        try {
            // Create DetailEquipe instances
            DetailEquipe detailEquipe1 = new DetailEquipe();
            detailEquipe1.setSalle(101);
            detailEquipe1.setThematique("Development");

            DetailEquipe detailEquipe2 = new DetailEquipe();
            detailEquipe2.setSalle(202);
            detailEquipe2.setThematique("Design");

            // Create Equipe instances
            Equipe equipe1 = new Equipe();
            equipe1.setNomEquipe("Team Alpha");
            equipe1.setNiveau(Niveau.EXPERT);
            equipe1.setDetailEquipe(detailEquipe1);
            equipe1.setNbMembres(5);
            equipe1.setAgeMoyen(27.5);
            equipe1.setProjetsLivres(12);
            equipe1.setProchaineEvolution(true);
            equipe1.setEtudiants(new HashSet<>());

            Equipe equipe2 = new Equipe();
            equipe2.setNomEquipe("Team Beta");
            equipe2.setNiveau(Niveau.SENIOR);
            equipe2.setDetailEquipe(detailEquipe2);
            equipe2.setNbMembres(3);
            equipe2.setAgeMoyen(24.0);
            equipe2.setProjetsLivres(5);
            equipe2.setProchaineEvolution(false);
            equipe2.setEtudiants(new HashSet<>());

            // Link DetailEquipe with Equipe (bidirectional)
            detailEquipe1.setEquipe(equipe1);
            detailEquipe2.setEquipe(equipe2);
            
            // With cascade operations configured, saving the Equipe will also save the DetailEquipe
            equipeRepository.save(equipe1);
            equipeRepository.save(equipe2);
            
            System.out.println("Test data initialized successfully!");
        } catch (Exception e) {
            System.err.println("Error initializing test data: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
