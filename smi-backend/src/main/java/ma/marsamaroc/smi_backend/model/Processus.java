package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import ma.marsamaroc.smi_backend.enums.TypeProcessus;
import ma.marsamaroc.smi_backend.enums.StatutProcessus;

@Entity
@Table(name = "processus")
@Getter
@Setter
public class Processus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String nom;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TypeProcessus type;

    private String pilote;

    private String version;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateRevision;

    @Enumerated(EnumType.STRING)
    private StatutProcessus statut;



    private String cheminPdf;

    private LocalDate dateCreation;

    private LocalDate dateModification;

    @PrePersist
    public void onPrePersist() {
        this.dateCreation = LocalDate.now();
        this.dateModification = LocalDate.now();
    }

    @PreUpdate
    public void onPreUpdate() {
        this.dateModification = LocalDate.now();
    }
}