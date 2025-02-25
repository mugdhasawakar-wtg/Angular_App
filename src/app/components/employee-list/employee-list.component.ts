import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []; // Store employee data
  showCreateEmployeeModal: boolean = false; // Modal visibility flag
  employee: any = { nameFirst: '', nameLast: '' }; // Store employee details
  isEdit: boolean = false; // Track edit mode

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees(); // Load employees when component initializes
  }

  // ✅ Fetch all employees
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((response: any) => {
      console.log('API Response:', response);
      this.employees = response._embedded.employee; // Extract employee list
    }, error => {
      console.error('Error fetching employees:', error);
    });
  }

  // ✅ Open the modal for creating a new employee
  openCreateModal() {
    console.log('Opening create employee modal');
    this.employee = { nameFirst: '', nameLast: '' }; // Reset form for new entry
    this.isEdit = false; // Set create mode
    this.showCreateEmployeeModal = true; // Show modal
  }

  closeCreateModal() {
    console.log('Closing create employee modal');
    this.showCreateEmployeeModal = false; // Hide the modal
  }

  handleEmployeeCreated() {
    this.fetchEmployees();
    this.closeCreateModal();
  }

  // ✅ Edit employee
  editEmployee(employee: any) {
    console.log('Editing employee:', employee);
    this.employee = { ...employee }; // Copy employee data
    this.isEdit = true; // Enable edit mode
    this.showCreateEmployeeModal = true; // Show modal
  }


  // ✅ Delete employee
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        alert('Employee deleted successfully!');
        this.fetchEmployees(); // Refresh employee list
      }, error => {
        console.error('Error deleting employee:', error);
      });
    }
  }
}
