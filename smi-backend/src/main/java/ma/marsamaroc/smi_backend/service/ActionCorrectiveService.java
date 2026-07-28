package ma.marsamaroc.smi_backend.service;

import ma.marsamaroc.smi_backend.model.ActionCorrective;
import ma.marsamaroc.smi_backend.repository.ActionCorrectiveRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionCorrectiveService {


    private final ActionCorrectiveRepository actionRepository;


    public ActionCorrectiveService(ActionCorrectiveRepository actionRepository) {

        this.actionRepository = actionRepository;

    }



    // Récupérer toutes les actions

    public List<ActionCorrective> getAllActions(){

        return actionRepository.findAll();

    }



    // Récupérer les actions d'un audit

    public List<ActionCorrective> getActionsByAudit(Long auditId){

        return actionRepository.findByAuditId(auditId);

    }



    // Enregistrer une action

    public ActionCorrective saveAction(ActionCorrective action){

        return actionRepository.save(action);

    }



    // Supprimer une action

    public void deleteAction(Long id){

        actionRepository.deleteById(id);

    }



    // Modifier une action

    public ActionCorrective updateAction(Long id, ActionCorrective newAction){

        ActionCorrective existing = actionRepository
                .findById(id)
                .orElseThrow(() -> 
                    new RuntimeException("Action non trouvée")
                );


        existing.setDescription(newAction.getDescription());

        existing.setResponsable(newAction.getResponsable());

        existing.setEcheance(newAction.getEcheance());

        existing.setPriorite(newAction.getPriorite());

        existing.setStatut(newAction.getStatut());


        return actionRepository.save(existing);

    }

}