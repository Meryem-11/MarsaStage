package ma.marsamaroc.smi_backend.service;


import ma.marsamaroc.smi_backend.model.Audit;
import ma.marsamaroc.smi_backend.repository.AuditRepository;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuditService {


    private final AuditRepository repository;


    public AuditService(AuditRepository repository) {

        this.repository = repository;

    }



    // récupérer tous les audits
    public List<Audit> getAll() {

        return repository.findAll();

    }



    // créer un audit
    public Audit save(Audit audit) {

        return repository.save(audit);

    }



    // supprimer un audit
    public void delete(Long id) {

        repository.deleteById(id);

    }

}