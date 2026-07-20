package ma.marsamaroc.smi_backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "programme_audit")
public class ProgrammeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;

    private String annee;

    private String responsable;

    private LocalDate dateCreation;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "programmeAudit",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Audit> audits = new ArrayList<>();


    public ProgrammeAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<Audit> getAudits() {
        return audits;
    }

    public void setAudits(List<Audit> audits) {
        this.audits = audits;
    }

    public void addAudit(Audit audit) {
        audits.add(audit);
        audit.setProgrammeAudit(this);
    }

    public void removeAudit(Audit audit) {
        audits.remove(audit);
        audit.setProgrammeAudit(null);
    }
}