// employees.component.ts

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  public employees!: Employee[];
  public title:string="Company Manager";
  public editEmployee: Employee|null=null;
  public deleteEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }
 
  public onOpenModal(employee: Employee , mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addEmployee') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }

    if (mode === 'edit') {
      this.editEmployee = { ...employee };
      button.setAttribute('data-target', '#updateEmployeeModal');
    }

    if (mode === 'delete') {
      this.deleteEmployee = { ...employee };
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    document.body.appendChild(button);

    // Click the button programmatically to open the modal
    button.click();
  }
  
  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[])=>{
        this.employees=response;
        console.log(this.employees);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }
public onAddEmployee(addForm: NgForm): void {
  this.employeeService.addEmployee(addForm.value).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}
public onUpdateEmployee(employeeData: Employee): void {
  this.employeeService.updateEmployee(employeeData).subscribe(
    (response: Employee) => {
      console.log(response);
      this.getEmployees(); // Refresh the employee list after updating an employee
      this.editEmployee = null; // Reset editEmployee after update
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteEmployee(employeeData: Employee | null): void {
  this.employeeService.deleteEmployee(employeeData == null ? 0 : employeeData.id).subscribe(
    () => {
      console.log('Employee deleted successfully');
      this.getEmployees(); // Refresh the employee list after deleting an employee
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
