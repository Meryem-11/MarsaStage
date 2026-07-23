package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

@Entity
@Table(name = "action_risque")
@Getter
@Setter
public class ActionRisque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAction;

    @ManyToOne
    @JoinColumn(name = "id_risque")
    private Risque risque;

    @Column(length = 1000, nullable = false)
    private String descriptionAction;

    private String responsable;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate delai;

    private String statut; // 'Non commencée', 'En cours', 'Réalisée', 'En retard'

    private String preuve; // chemin/nom de fichier justificatif (optionnel)
}