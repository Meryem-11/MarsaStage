package ma.marsamaroc.smi_backend.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import ma.marsamaroc.smi_backend.model.Processus;
import ma.marsamaroc.smi_backend.service.ProcessusService;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/processus")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProcessusController {

    private final ProcessusService service;

    @GetMapping
    public List<Processus> getAll(){
        return service.getAll();
    }

    @PostMapping
    public Processus save(@RequestBody Processus processus){
        return service.save(processus);
    }

    @PutMapping("/{code}")
    public Processus update(@PathVariable String code, @RequestBody Processus processus){
        return service.updateByCode(code, processus);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
    @PostMapping("/{code}/upload-pdf")
public Processus uploadPdf(@PathVariable String code, @RequestParam("file") MultipartFile file) throws IOException {
    return service.uploadPdf(code, file);
}
}