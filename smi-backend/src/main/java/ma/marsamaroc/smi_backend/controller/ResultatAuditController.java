package ma.marsamaroc.smi_backend.controller;

import ma.marsamaroc.smi_backend.model.ResultatAudit;
import ma.marsamaroc.smi_backend.service.ResultatAuditService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resultats")
@CrossOrigin(origins = "http://localhost:4200")
public class ResultatAuditController {

    private final ResultatAuditService service;

    public ResultatAuditController(ResultatAuditService service) {

        this.service = service;

    }

    /********************************
     * TOUS LES RESULTATS
     ********************************/

    @GetMapping
    public List<ResultatAudit> getAll() {

        return service.getAll();

    }

    /********************************
     * RESULTAT PAR ID
     ********************************/

    @GetMapping("/{id}")
    public ResultatAudit getById(@PathVariable Long id) {

        return service.getById(id);

    }

    /********************************
     * CREER
     ********************************/

    @PostMapping
    public ResultatAudit create(

            @RequestBody ResultatAudit resultat

    ) {

        return service.save(resultat);

    }

    /********************************
     * MODIFIER
     ********************************/

    @PutMapping("/{id}")
    public ResultatAudit update(

            @PathVariable Long id,

            @RequestBody ResultatAudit resultat

    ) {

        resultat.setId(id);

        return service.update(resultat);

    }

    /********************************
     * SUPPRIMER
     ********************************/

    @DeleteMapping("/{id}")
    public void delete(

            @PathVariable Long id

    ) {

        service.delete(id);

    }

}