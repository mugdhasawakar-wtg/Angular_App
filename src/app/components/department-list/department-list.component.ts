import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: any[] = []; // Stores departments
  selectedDepartment: any = null; // Holds department being edited
  isEdit: boolean = false; // Flag for edit mode

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.fetchDepartments(); // Load departments on component initialization
  }

  // ✅ Fetch departments from API
  fetchDepartments() {
    this.departmentService.getDepartments().subscribe((response: any) => {
      this.departments = response._embedded.department; // Extract department list
    }, error => {
      console.error('Error fetching departments:', error);
    });
  }

  // ✅ Open modal for creating a new department
  openCreateModal() {
    console.log("Create button clicked");
    this.selectedDepartment = { name: '', readOnly: false, mandatory: false };
    this.isEdit = false;
  }

  // ✅ Open modal for editing an existing department
  editDepartment(department: any) {
    this.selectedDepartment = { ...department }; // Clone object to avoid mutation
    this.isEdit = true;
  }

  // ✅ Delete a department
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        alert('Department deleted successfully!');
        this.fetchDepartments(); // Refresh list after deletion
      }, error => {
        console.error('Error deleting department:', error);
      });
    }
  }
}
