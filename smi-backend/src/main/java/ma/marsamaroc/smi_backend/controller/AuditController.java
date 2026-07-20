package ma.marsamaroc.smi_backend.controller;


import ma.marsamaroc.smi_backend.model.Audit;
import ma.marsamaroc.smi_backend.service.AuditService;


import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/audits")
@CrossOrigin(origins = "http://localhost:4200")
public class AuditController {



    private final AuditService service;



    public AuditController(AuditService service) {

        this.service = service;

    }



    // GET tous les audits
    @GetMapping
    public List<Audit> getAll() {

        return service.getAll();

    }



    // POST créer un audit
    @PostMapping
    public Audit create(
            @RequestBody Audit audit) {

        return service.save(audit);

    }



    // DELETE supprimer un audit
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id) {

        service.delete(id);

    }

}