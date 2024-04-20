// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ComputersComponent } from './computers/computers.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'computers', component: ComputersComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
