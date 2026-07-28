package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PlanAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String objectifs;

    private String perimetre;

    private String criteres;

    @OneToOne
    @JoinColumn(name = "audit_id")
    private Audit audit;

    @OneToMany(
            mappedBy = "planAudit",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<EquipeAudit> equipe = new ArrayList<>();

    @OneToMany(
            mappedBy = "planAudit",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PlanningAudit> planning = new ArrayList<>();

    public PlanAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObjectifs() {
        return objectifs;
    }

    public void setObjectifs(String objectifs) {
        this.objectifs = objectifs;
    }

    public String getPerimetre() {
        return perimetre;
    }

    public void setPerimetre(String perimetre) {
        this.perimetre = perimetre;
    }

    public String getCriteres() {
        return criteres;
    }

    public void setCriteres(String criteres) {
        this.criteres = criteres;
    }

    public Audit getAudit() {
        return audit;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public List<EquipeAudit> getEquipe() {
        return equipe;
    }

    public void setEquipe(List<EquipeAudit> equipe) {
        this.equipe = equipe;
    }

    public List<PlanningAudit> getPlanning() {
        return planning;
    }

    public void setPlanning(List<PlanningAudit> planning) {
        this.planning = planning;
    }
}