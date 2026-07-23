package ma.marsamaroc.smi_backend.service;

import org.springframework.stereotype.Service;
import ma.marsamaroc.smi_backend.model.ActionRisque;
import ma.marsamaroc.smi_backend.repository.ActionRisqueRepository;
import java.util.List;

@Service
public class ActionRisqueService {

    private final ActionRisqueRepository repository;

    public ActionRisqueService(ActionRisqueRepository repository) {
        this.repository = repository;
    }

    public List<ActionRisque> getAll() {
        return repository.findAll();
    }

    public List<ActionRisque> getByRisque(Long idRisque) {
        return repository.findByRisque_IdRisque(idRisque);
    }

    public List<ActionRisque> getByProcessus(String code) {
        return repository.findByRisque_Processus_Code(code);
    }

    public ActionRisque save(ActionRisque action) {
        return repository.save(action);
    }

    public ActionRisque update(Long id, ActionRisque updated) {
        ActionRisque existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Action introuvable avec l'id : " + id));

        existing.setRisque(updated.getRisque());
        existing.setDescriptionAction(updated.getDescriptionAction());
        existing.setResponsable(updated.getResponsable());
        existing.setDelai(updated.getDelai());
        existing.setStatut(updated.getStatut());
        existing.setPreuve(updated.getPreuve());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}