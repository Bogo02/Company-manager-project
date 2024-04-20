// projects.component.ts

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service'; 
import { Project } from '../project';  
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  editProject: Project | null = null;
  deleteProject: Project | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
        console.log(this.projects);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenProjectModal(project: Project, mode: string): void {
    const container = document.getElementById('third-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addProject') {
      button.setAttribute('data-target', '#addProjectModal');  // Replace with your actual modal ID
    }

    if (mode === 'edit') {
      this.editProject = { ...project };
      button.setAttribute('data-target', '#updateProjectModal');  // Replace with your actual modal ID
    }

    if (mode === 'delete') {
      this.deleteProject = { ...project };
      button.setAttribute('data-target', '#deleteProjectModal');  // Replace with your actual modal ID
    }
    document.body.appendChild(button);

    // Click the button programmatically to open the modal
    button.click();
  }

  public searchProjects(key: string): void {
    console.log(key);
    const results: Project[] = [];
    for (const project of this.projects) {
      if (
        project.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        project.deadline.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(project);
      }
    }
    this.projects = results;
    if (results.length === 0 || !key) {
      this.getProjects();
    }
  }

  onAddProject(addProjectForm: NgForm): void {
    this.projectService.addProject(addProjectForm.value).subscribe(
      (response: Project) => {
        console.log(response);
        this.getProjects();
        addProjectForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addProjectForm.reset();
      }
    );
  }

  onUpdateProject(projectData: Project): void {
    this.projectService.updateProject(projectData).subscribe(
      (response: Project) => {
        console.log(response);
        this.getProjects(); // Refresh the project list after updating a project
        this.editProject = null; // Reset editProject after update
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteProject(projectData: Project | null): void {
    this.projectService.deleteProject(projectData == null ? 0 : projectData.id).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.getProjects(); // Refresh the project list after deleting a project
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
