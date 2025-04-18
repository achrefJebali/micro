package tn.esprit.microservice.kassil.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice.kassil.entities.Equipe;
import tn.esprit.microservice.kassil.repositories.EquipeRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/equipes")
@RequiredArgsConstructor
public class EquipeController {

    private final EquipeRepository equipeRepository;

    @GetMapping
    public ResponseEntity<Iterable<Equipe>> getAllEquipes() {
        return ResponseEntity.ok(equipeRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipe> getEquipeById(@PathVariable Integer id) {
        Optional<Equipe> equipe = equipeRepository.findById(id);
        return equipe.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Equipe> createEquipe(@RequestBody Equipe equipe) {
        Equipe savedEquipe = equipeRepository.save(equipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEquipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipe> updateEquipe(@PathVariable Integer id, @RequestBody Equipe equipe) {
        if (!equipeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipe.setIdEquipe(id);
        return ResponseEntity.ok(equipeRepository.save(equipe));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipe(@PathVariable Integer id) {
        if (!equipeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
