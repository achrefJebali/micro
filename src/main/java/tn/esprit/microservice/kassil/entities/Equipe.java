package tn.esprit.microservice.kassil.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity
public class Equipe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEquipe;

    private String nomEquipe;

    @Enumerated(EnumType.STRING)
    private Niveau niveau;
    
    // Bidirectional relationship with DetailEquipe
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "detail_equipe_id")
    private DetailEquipe detailEquipe;
    
    // Bidirectional ManyToMany relationship with Etudiant
    @ManyToMany
    @JoinTable(
        name = "etudiant_equipe",
        joinColumns = @JoinColumn(name = "equipe_id"),
        inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    private Set<Etudiant> etudiants;

    // 📊 New fields for AI
    private Integer nbMembres;
    private Double ageMoyen;
    private Integer projetsLivres;

    // 🧠 Prediction output (optional)
    private Boolean prochaineEvolution;
}


