package ma.marsamaroc.smi_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "audit")
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;

    private String titre;

    private String type;

    private String terminal;

    private String auditeur;

    private LocalDate dateDebut;

    private LocalDate dateFin;

    private String statut;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "programme_id")
    private ProgrammeAudit programmeAudit;
    
   @OneToMany(
    mappedBy = "audit",
    cascade = CascadeType.ALL
)
private List<ActionCorrective> actions = new ArrayList<>();

    public Audit() {
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

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public String getAuditeur() {
        return auditeur;
    }

    public void setAuditeur(String auditeur) {
        this.auditeur = auditeur;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public ProgrammeAudit getProgrammeAudit() {
        return programmeAudit;
    }

    public void setProgrammeAudit(ProgrammeAudit programmeAudit) {
        this.programmeAudit = programmeAudit;
    }
}