package ma.marsamaroc.smi_backend.service;

import ma.marsamaroc.smi_backend.model.EquipeAudit;
import ma.marsamaroc.smi_backend.model.PlanAudit;
import ma.marsamaroc.smi_backend.model.PlanningAudit;
import ma.marsamaroc.smi_backend.repository.PlanAuditRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanAuditService {

    private final PlanAuditRepository repository;

    public PlanAuditService(PlanAuditRepository repository) {
        this.repository = repository;
    }

    // Récupérer tous les plans
    public List<PlanAudit> getAll() {
        return repository.findAll();
    }

    // Récupérer un plan par son id
    public PlanAudit getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan d'audit introuvable"));

    }

    // Enregistrer un plan
    public PlanAudit save(PlanAudit planAudit) {

        if (planAudit.getEquipe() != null) {

            for (EquipeAudit membre : planAudit.getEquipe()) {

                membre.setPlanAudit(planAudit);

            }

        }

        if (planAudit.getPlanning() != null) {

            for (PlanningAudit activite : planAudit.getPlanning()) {

                activite.setPlanAudit(planAudit);

            }

        }

        return repository.save(planAudit);

    }

    // Modifier un plan
    public PlanAudit update(PlanAudit planAudit) {

        if (planAudit.getEquipe() != null) {

            for (EquipeAudit membre : planAudit.getEquipe()) {

                membre.setPlanAudit(planAudit);

            }

        }

        if (planAudit.getPlanning() != null) {

            for (PlanningAudit activite : planAudit.getPlanning()) {

                activite.setPlanAudit(planAudit);

            }

        }

        return repository.save(planAudit);

    }

    // Supprimer un plan
    public void delete(Long id) {

        repository.deleteById(id);

    }

}