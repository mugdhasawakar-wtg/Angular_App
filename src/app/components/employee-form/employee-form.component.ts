import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any = { name: '', department: '' }; // Store employee data
  departments: any[] = []; // Store available departments
  isEdit: boolean = false; // Track if editing mode

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.fetchDepartments(); // Load departments when component initializes
  }

  // ✅ Fetch all departments
  fetchDepartments() {
    this.departmentService.getDepartments().subscribe((response: any) => {
      this.departments = response._embedded.department; // Extract department list
    }, error => {
      console.error('Error fetching departments:', error);
    });
  }

  // ✅ Submit form for creating or updating employee
  onSubmit() {
    if (this.isEdit) {
      console.log('Updating employee:', this.employee);
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
        alert('Employee updated successfully!');
      }, error => {
        console.error('Error updating employee:', error);
      });
    } else {
      console.log('Creating employee:', this.employee);
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        alert('Employee created successfully!');
      }, error => {
        console.error('Error creating employee:', error);
      });
    }
  }

  // ✅ Cancel form submission
  cancel() {
    this.employee = { name: '', department: '' }; // Reset form
    this.isEdit = false;
  }
}
