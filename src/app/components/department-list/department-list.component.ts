import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: any[] = [];
  selectedDepartment: any = null;
  isEdit: boolean = false;
  showModal: boolean = false; // ✅ Controls modal visibility

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe((response: any) => {
      this.departments = response._embedded.department;
    }, error => {
      console.error('Error fetching departments:', error);
    });
  }

  openCreateModal() {
    this.selectedDepartment = { name: '', readOnly: false, mandatory: false };
    this.isEdit = false;
    this.showModal = true; // ✅ Open modal
  }

  editDepartment(department: any) {
    this.selectedDepartment = { ...department };
    this.isEdit = true;
    this.showModal = true; // ✅ Open modal
  }

  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        alert('Department deleted successfully!');
        this.fetchDepartments();
      }, error => {
        console.error('Error deleting department:', error);
      });
    }
  }

  closeModal() {
    this.showModal = false; // ✅ Close modal
  }
}
