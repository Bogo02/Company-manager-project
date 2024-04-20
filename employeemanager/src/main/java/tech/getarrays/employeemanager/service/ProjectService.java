package tech.getarrays.employeemanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager.exception.ProjectNotFoundException;
import tech.getarrays.employeemanager.model.Project;
import tech.getarrays.employeemanager.repo.ProjectRepo;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ProjectService {
    private final ProjectRepo projectRepo;

    @Autowired
    public ProjectService(ProjectRepo projectRepo) {
        this.projectRepo = projectRepo;
    }

    public Project addProject(Project project) {
        project.setImageUrl(UUID.randomUUID().toString()); // or set the image URL as needed
        return projectRepo.save(project);
    }

    public List<Project> findAllProjects() {
        return projectRepo.findAll();
    }

    public Project updateProject(Project project) {
        return projectRepo.save(project);
    }

    public Project findProjectById(Long id) {
        return projectRepo.findProjectById(id).orElseThrow(() ->
                new ProjectNotFoundException("Project by id " + id + " was not found"));
    }

    public void deleteProject(Long id) {
        projectRepo.deleteProjectById(id);
    }
}
