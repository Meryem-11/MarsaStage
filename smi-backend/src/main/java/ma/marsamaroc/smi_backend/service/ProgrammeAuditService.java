package ma.marsamaroc.smi_backend.service;

import ma.marsamaroc.smi_backend.model.Audit;
import ma.marsamaroc.smi_backend.model.ProgrammeAudit;
import ma.marsamaroc.smi_backend.repository.ProgrammeAuditRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgrammeAuditService {

    private final ProgrammeAuditRepository repository;

    public ProgrammeAuditService(ProgrammeAuditRepository repository) {
        this.repository = repository;
    }

    public List<ProgrammeAudit> getAll() {
        return repository.findAll();
    }

    public ProgrammeAudit save(ProgrammeAudit programme) {

        if (programme.getAudits() != null) {

            for (Audit audit : programme.getAudits()) {
                audit.setProgrammeAudit(programme);
            }

        }

        return repository.save(programme);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

}