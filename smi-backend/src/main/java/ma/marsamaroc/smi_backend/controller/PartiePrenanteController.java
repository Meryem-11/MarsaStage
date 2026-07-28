package com.marsa.smi.controller;

import com.marsa.smi.model.PartiePrenante;
import com.marsa.smi.repository.PartiePrenanteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parties-prenantes")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS
})
public class PartiePrenanteController {

    private final PartiePrenanteRepository partiePrenanteRepository;

    public PartiePrenanteController(PartiePrenanteRepository partiePrenanteRepository) {
        this.partiePrenanteRepository = partiePrenanteRepository;
    }

    @GetMapping
    public List<PartiePrenante> getAll() {
        return partiePrenanteRepository.findAll();
    }

    @PostMapping
    public PartiePrenante create(@RequestBody PartiePrenante item) {
        return partiePrenanteRepository.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartiePrenante> update(@PathVariable Long id, @RequestBody PartiePrenante details) {
        return partiePrenanteRepository.findById(id)
                .map(item -> {
                    item.setNom(details.getNom());
                    item.setRole(details.getRole());
                    item.setType(details.getType());
                    item.setInfluence(details.getInfluence());
                    item.setInteret(details.getInteret());
                    item.setAttentes(details.getAttentes());
                    item.setRisque(details.getRisque());
                    item.setAction(details.getAction());
                    return ResponseEntity.ok(partiePrenanteRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (partiePrenanteRepository.existsById(id)) {
            partiePrenanteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}