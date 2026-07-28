package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resultat_audit")
public class ResultatAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String conclusion;

    @OneToOne
    @JoinColumn(name = "audit_id")
    private Audit audit;

    @OneToMany(
            mappedBy = "resultatAudit",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ConstatAudit> constats = new ArrayList<>();

    public ResultatAudit() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public Audit getAudit() {
        return audit;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public List<ConstatAudit> getConstats() {
        return constats;
    }

    public void setConstats(List<ConstatAudit> constats) {
        this.constats = constats;
    }

}