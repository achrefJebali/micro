package tn.esprit.microservice.kassil.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.kassil.entities.Equipe;
import tn.esprit.microservice.kassil.entities.Niveau;
import tn.esprit.microservice.kassil.repositories.EquipeRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@AllArgsConstructor
@Service
public class EquipeServiceImpl implements EquipeService, IEquipeService {

    private final EquipeRepository equipeRepository;
    private final EmailService emailService;
    public List<Equipe> retrieveAllEquipes() {
        return (List<Equipe>) equipeRepository.findAll();
    }

    public Equipe addEquipe(Equipe e) {
        Equipe saved = equipeRepository.save(e);
        emailService.sendNotification("Nouvelle Équipe", "L'équipe " + e.getNomEquipe() + " a été ajoutée.");
        return saved;
    }

    public void deleteEquipe(Integer idEquipe) {
        equipeRepository.deleteById(idEquipe);
    }

    public Equipe retrieveEquipe(Integer equipeId) {
        return equipeRepository.findById(equipeId).orElse(null);
    }

    public Equipe updateEquipe(Equipe e) {
        return equipeRepository.save(e);
    }

    public void evoluerEquipes() {
        List<Equipe> equipes = (List<Equipe>) equipeRepository.findAll();
        for (Equipe equipe : equipes) {
            Niveau oldNiveau = equipe.getNiveau();
            if (oldNiveau == Niveau.JUNIOR) {
                equipe.setNiveau(Niveau.SENIOR);
            } else if (oldNiveau == Niveau.SENIOR) {
                equipe.setNiveau(Niveau.EXPERT);
            }
            equipeRepository.save(equipe);
            if (oldNiveau != equipe.getNiveau()) {
                emailService.sendNotification(
                        "Équipe Évoluée",
                        "L'équipe " + equipe.getNomEquipe() + " est maintenant " + equipe.getNiveau()
                );
            }
        }
    }

    @Override
    public Map<String, Long> getEquipeStats() {
        return null;
    }

    public Equipe predictEvolution(Equipe e) {
        // Simple rule-based prediction (replace with ML model later)
        boolean shouldEvolve = e.getNbMembres() > 5 && e.getAgeMoyen() > 25 && e.getProjetsLivres() >= 3;
        e.setProchaineEvolution(shouldEvolve);
        return equipeRepository.save(e);
    }

    // Implementation of EquipeService interface methods
    @Override
    public List<Equipe> getAllEquipes() {
        return StreamSupport.stream(equipeRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Equipe> getEquipeById(Integer id) {
        return equipeRepository.findById(id);
    }

    @Override
    public Equipe saveEquipe(Equipe equipe) {
        return equipeRepository.save(equipe);
    }

    @Override
    public List<Equipe> getEquipesByNiveau(String niveau) {
        try {
            Niveau niveauEnum = Niveau.valueOf(niveau.toUpperCase());
            return StreamSupport.stream(equipeRepository.findAll().spliterator(), false)
                    .filter(equipe -> equipe.getNiveau() == niveauEnum)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            log.error("Invalid niveau value: {}", niveau);
            return List.of();
        }
    }

    @Override
    public Integer countEquipes() {
        return (int) equipeRepository.count();
    }
}
