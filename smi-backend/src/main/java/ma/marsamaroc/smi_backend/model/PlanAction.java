package ma.marsamaroc.smi_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import ma.marsamaroc.smi_backend.enums.OrigineModule;
import ma.marsamaroc.smi_backend.enums.PrioriteAction;
import ma.marsamaroc.smi_backend.enums.StatutAction;

@Entity
@Table(name = "plan_action")
@Getter
@Setter
public class PlanAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAction;

    @ManyToOne
    @JoinColumn(name = "id_processus")
    private Processus processus;

    // Temporaire : String en attendant l'entité Utilisateur.
    // À remplacer par : @ManyToOne @JoinColumn(name = "id_responsable") private Utilisateur responsable;
    private String responsable;

    @Column(nullable = false)
    private String intitule;

  

    // Clé polymorphe : indique quel module et quel enregistrement ont généré l'action
    @Enumerated(EnumType.STRING)
    private OrigineModule origineModule;

    private UUID origineId;

    @Enumerated(EnumType.STRING)
    private PrioriteAction priorite;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate echeance;

    @Enumerated(EnumType.STRING)
    private StatutAction statut;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCloture;

    // "preuve" du document = fichier joint ; on stocke nom + chemin physique
    private String preuveNom;
    private String cheminPreuve;

    @PreUpdate
    public void onPreUpdate() {
        if (statut == StatutAction.TERMINEE && dateCloture == null) {
            dateCloture = LocalDate.now();
        }
    }
}