package tn.esprit.microservice.kassil.services;

import tn.esprit.microservice.kassil.entities.Equipe;
import java.util.List;
import java.util.Optional;

public interface EquipeService {
    List<Equipe> getAllEquipes();
    Optional<Equipe> getEquipeById(Integer id);
    Equipe saveEquipe(Equipe equipe);
    void deleteEquipe(Integer id);
    List<Equipe> getEquipesByNiveau(String niveau);
    Integer countEquipes();
}
