package ma.marsamaroc.smi_backend.service;

import ma.marsamaroc.smi_backend.model.ConstatAudit;
import ma.marsamaroc.smi_backend.model.ResultatAudit;
import ma.marsamaroc.smi_backend.repository.ResultatAuditRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultatAuditService {

    private final ResultatAuditRepository repository;

    public ResultatAuditService(ResultatAuditRepository repository) {

        this.repository = repository;

    }

    public List<ResultatAudit> getAll() {

        return repository.findAll();

    }

    public ResultatAudit getById(Long id) {

        return repository.findById(id)

                .orElseThrow(

                        () -> new RuntimeException("Résultat introuvable")

                );

    }

    public ResultatAudit save(ResultatAudit resultat) {

        if(resultat.getConstats()!=null){

            for(ConstatAudit constat : resultat.getConstats()){

                constat.setResultatAudit(resultat);

            }

        }

        return repository.save(resultat);

    }

    public ResultatAudit update(ResultatAudit resultat){

        if(resultat.getConstats()!=null){

            for(ConstatAudit constat : resultat.getConstats()){

                constat.setResultatAudit(resultat);

            }

        }

        return repository.save(resultat);

    }

    public void delete(Long id){

        repository.deleteById(id);

    }

}