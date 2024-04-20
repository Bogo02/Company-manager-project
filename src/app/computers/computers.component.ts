import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../computer.service';
import { Computers } from '../computer';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})

export class ComputersComponent implements OnInit {
  computers: Computers[] = [];
  editComputer: Computers | null = null;
  deleteComputer: Computers | null = null;

  constructor(private computerService: ComputerService) {}

  ngOnInit(): void {
    this.getComputers();
  }

  getComputers(): void {
    this.computerService.getComputers().subscribe(
      (response: Computers[]) => {
        this.computers = response;
        console.log(this.computers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenComputerModal(computer:Computers , mode: string): void {
    const container = document.getElementById('second-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'addComputer') {
      button.setAttribute('data-target', '#addComputerModal');
    }

    if (mode === 'edit') {
      this.editComputer = { ...computer };
      button.setAttribute('data-target', '#updateComputerModal');
    }

    if (mode === 'delete') {
      this.deleteComputer = { ...computer };
      button.setAttribute('data-target', '#deleteComputerModal');
    }
    document.body.appendChild(button);

    // Click the button programmatically to open the modal
    button.click();
  }

  onAddComputer(addComputerForm: NgForm): void {
    console.log(addComputerForm);
    this.computerService.addComputer(addComputerForm.value).subscribe(
      (response: Computers) => {
        console.log(response);
        this.getComputers();
        addComputerForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addComputerForm.reset();
      }
    );
  }

  onUpdateComputer(computerData: Computers): void {
    this.computerService.updateComputer(computerData).subscribe(
      (response: Computers) => {
        console.log(response);
        this.getComputers(); // Refresh the computer list after updating a computer
        this.editComputer = null; // Reset editComputer after update
        console.log(computerData);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteComputer(computerData: Computers | null): void {
    this.computerService.deleteComputer(computerData == null ? 0 : computerData.id).subscribe(
        () => {
          console.log('Computer removed successfully');
          this.getComputers(); // Refresh the computers list after removing a computer
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
  public searchComputers(key: string): void {
    console.log(key);
    const results: Computers[] = [];
    for (const computer of this.computers) {
      if (
        computer.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(computer);
      }
    }
    this.computers = results;
    if (results.length === 0 || !key) {
      this.getComputers();
    }
  }
  
}
