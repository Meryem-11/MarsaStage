package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "constat_audit")
public class ConstatAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categorie;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String exigence;

    private String responsable;

    private String echeance;

    private String statut;

    @ManyToOne
    @JoinColumn(name = "resultat_audit_id")
    private ResultatAudit resultatAudit;

    public ConstatAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExigence() {
        return exigence;
    }

    public void setExigence(String exigence) {
        this.exigence = exigence;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getEcheance() {
        return echeance;
    }

    public void setEcheance(String echeance) {
        this.echeance = echeance;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public ResultatAudit getResultatAudit() {
        return resultatAudit;
    }

    public void setResultatAudit(ResultatAudit resultatAudit) {
        this.resultatAudit = resultatAudit;
    }

}