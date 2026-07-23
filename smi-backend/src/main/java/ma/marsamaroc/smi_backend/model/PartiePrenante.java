package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import ma.marsamaroc.smi_backend.enums.CategoriePartie;
import ma.marsamaroc.smi_backend.enums.NiveauInfluence;

@Entity
@Table(name = "partie_prenante")
public class PartiePrenante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Enumerated(EnumType.STRING)
    private CategoriePartie categorie;

    @Column(length = 500)
    private String attentes;

    @Enumerated(EnumType.STRING)
    private NiveauInfluence niveauInfluence;

    private Integer niveauSatisfaction;

    public PartiePrenante() {}

    // Getters & Setters
}