package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "risque")
@Getter
@Setter
public class Risque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRisque;

    @ManyToOne
    @JoinColumn(name = "id_processus")
    @JsonProperty("processus")
    private Processus processus;

    private String code;

    @Column(length = 1000)
    private String description;

    private String categorie;

    @Column(length = 1000)
    private String cause;

    private Integer gravite;
    private Integer probabilite;
    private Integer detectabilite;
    private Integer criticite;

    private String statut;

    @Column(name = "mesure_prevention", length = 1000)
    private String mesurePrevention;
}