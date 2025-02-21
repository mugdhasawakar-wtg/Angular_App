import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []; // Store employee data
  showCreateEmployeeModal: boolean = false; // Modal visibility flag

  //@ViewChild(EmployeeFormComponent) employeeForm!: EmployeeFormComponent;

  constructor(private employeeService: EmployeeService) {}

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
    //this.showCreateEmployeeModal = true;
    // You can navigate to a form page or show a modal here
  }

  // ✅ Edit employee
  editEmployee(employee: any) {
    console.log('Editing employee:', employee);
    // Navigate to form with employee data or open modal
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
