package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "analyse_swot")
public class AnalyseSWOT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("idSWOT")
    private Long idSWOT;

    @Column(nullable = false)
    private String type; // 'FORCE', 'FAIBLESSE', 'OPPORTUNITE', 'MENACE'

    @Column(length = 1000, nullable = false)
    private String description;

    private String priorite; // 'HAUTE', 'MOYENNE', 'BASSE'

    private LocalDate date;

    public AnalyseSWOT() {
        this.date = LocalDate.now();
    }

    public AnalyseSWOT(String type, String description) {
        this.type = type;
        this.description = description;
        this.date = LocalDate.now();
    }

    // Getters et Setters
    public Long getIdSWOT() { return idSWOT; }
    public void setIdSWOT(Long idSWOT) { this.idSWOT = idSWOT; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPriorite() { return priorite; }
    public void setPriorite(String priorite) { this.priorite = priorite; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}