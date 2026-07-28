package com.marsa.smi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "parties_prenantes")
public class PartiePrenante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    private String role;

    @Column(nullable = false)
    private String type; // Interne / Externe

    private String influence; // Faible / Moyenne / Élevée

    private String interet; // Faible / Moyen / Élevé

    @Column(columnDefinition = "TEXT")
    private String attentes;

    @Column(columnDefinition = "TEXT")
    private String risque;

    @Column(columnDefinition = "TEXT")
    private String action;

    public PartiePrenante() {}

    public PartiePrenante(String nom, String role, String type, String influence,
                           String interet, String attentes, String risque, String action) {
        this.nom = nom;
        this.role = role;
        this.type = type;
        this.influence = influence;
        this.interet = interet;
        this.attentes = attentes;
        this.risque = risque;
        this.action = action;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getInfluence() { return influence; }
    public void setInfluence(String influence) { this.influence = influence; }

    public String getInteret() { return interet; }
    public void setInteret(String interet) { this.interet = interet; }

    public String getAttentes() { return attentes; }
    public void setAttentes(String attentes) { this.attentes = attentes; }

    public String getRisque() { return risque; }
    public void setRisque(String risque) { this.risque = risque; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}