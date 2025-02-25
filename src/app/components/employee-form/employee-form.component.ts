import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>(); // Emit event to close modal
  @Output() employeeCreated = new EventEmitter<void>(); // Emit event after saving
  @Input() employee: any = { nameFirst: '', nameLast: '' }; // Accept employee data
  @Input() isEdit: boolean = false; // Accept edit flag

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  // ✅ Submit form for creating or updating employee
  onSubmit() {
    // Convert department objects to an array of URI strings
    if (this.employee.departments && this.employee.departments.length > 0) {
      this.employee.departments = this.employee.departments.map((dept: any) =>
        `/API/department/${dept.id}`
      );
    }

    if (this.isEdit) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
        alert('Employee updated successfully!');
        this.employeeCreated.emit(); // Notify parent
      }, error => {
        console.error('Error updating employee:', error);
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        alert('Employee created successfully!');
        this.employeeCreated.emit(); // Notify parent
      }, error => {
        console.error('Error creating employee:', error);
      });
    }
  }

  // ✅ Close modal
  cancel() {
    this.closeModal.emit(); // Notify parent to close modal
  }
}
