package ma.marsamaroc.smi_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class EquipeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String role;

    @ManyToOne
    @JoinColumn(name = "plan_audit_id")
    @JsonIgnore
    private PlanAudit planAudit;

    public EquipeAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public PlanAudit getPlanAudit() {
        return planAudit;
    }

    public void setPlanAudit(PlanAudit planAudit) {
        this.planAudit = planAudit;
    }
}