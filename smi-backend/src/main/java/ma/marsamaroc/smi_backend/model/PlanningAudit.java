package ma.marsamaroc.smi_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class PlanningAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jour;

    private String horaire;

    private String activite;

    @ManyToOne
    @JoinColumn(name = "plan_audit_id")
    @JsonIgnore
    private PlanAudit planAudit;

    public PlanningAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJour() {
        return jour;
    }

    public void setJour(String jour) {
        this.jour = jour;
    }

    public String getHoraire() {
        return horaire;
    }

    public void setHoraire(String horaire) {
        this.horaire = horaire;
    }

    public String getActivite() {
        return activite;
    }

    public void setActivite(String activite) {
        this.activite = activite;
    }

    public PlanAudit getPlanAudit() {
        return planAudit;
    }

    public void setPlanAudit(PlanAudit planAudit) {
        this.planAudit = planAudit;
    }
}