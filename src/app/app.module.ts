import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { ComputersComponent } from './computers/computers.component';
import { ProjectsComponent } from './projects/projects.component';  // Import ProjectsComponent
import { EmployeeService } from './employee.service';
import { ComputerService } from './computer.service';
import { ProjectService } from './project.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ComputersComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [EmployeeService, ComputerService, ProjectService], 
  bootstrap: [AppComponent],
})
export class AppModule {}
