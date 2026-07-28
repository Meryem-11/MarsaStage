package ma.marsamaroc.smi_backend.controller;


import ma.marsamaroc.smi_backend.model.ActionCorrective;
import ma.marsamaroc.smi_backend.service.ActionCorrectiveService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/actions")
@CrossOrigin(origins = "http://localhost:4200")
public class ActionCorrectiveController {



    private final ActionCorrectiveService actionService;



    public ActionCorrectiveController(ActionCorrectiveService actionService){

        this.actionService = actionService;

    }




    // GET toutes les actions
    @GetMapping
    public List<ActionCorrective> getAllActions(){

        return actionService.getAllActions();

    }





    // GET actions d'un audit
    // exemple : /api/actions/audit/5

    @GetMapping("/audit/{auditId}")
    public List<ActionCorrective> getActionsByAudit(
            @PathVariable Long auditId){

        return actionService.getActionsByAudit(auditId);

    }





    // POST créer une action

    @PostMapping
    public ResponseEntity<ActionCorrective> createAction(
            @RequestBody ActionCorrective action){

        ActionCorrective saved =
                actionService.saveAction(action);

        return ResponseEntity.ok(saved);

    }





    // PUT modifier une action

    @PutMapping("/{id}")
    public ResponseEntity<ActionCorrective> updateAction(
            @PathVariable Long id,
            @RequestBody ActionCorrective action){


        ActionCorrective updated =
                actionService.updateAction(id, action);


        return ResponseEntity.ok(updated);

    }





    // DELETE supprimer

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAction(
            @PathVariable Long id){


        actionService.deleteAction(id);


        return ResponseEntity.noContent().build();

    }

}