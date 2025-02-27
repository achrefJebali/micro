package tn.esprit.microservice.formation.entitiy;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_formation")
    private String nomFormation;

    @Column(name = "description")
    private String description;

    @Column(name = "date_formation")

    private String dateFormation;

    @Column(name = "nombre_place")
    private int nombrePlace;
}
