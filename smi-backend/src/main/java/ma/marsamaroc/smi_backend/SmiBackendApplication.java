package ma.marsamaroc.smi_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"ma.marsamaroc.smi_backend", "com.marsa.smi"})
@EntityScan(basePackages = {"ma.marsamaroc.smi_backend.model", "com.marsa.smi.model"})
@EnableJpaRepositories(basePackages = {"ma.marsamaroc.smi_backend.repository", "com.marsa.smi.repository"})
public class SmiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmiBackendApplication.class, args);
	}

}