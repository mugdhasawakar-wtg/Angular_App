import { Component, Input } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent {
  @Input() isEdit: boolean = false;
  @Input() department: any = { name: '', readOnly: false, mandatory: false };

  constructor(private departmentService: DepartmentService) {}

  onSubmit() {
    if (this.isEdit) {
      // ✅ Update department
      this.departmentService.updateDepartment(this.department.id, this.department).subscribe(response => {
        console.log('Department updated:', response);
        alert('Department updated successfully!');
      }, error => {
        console.error('Error updating department:', error);
        alert('Failed to update department.');
      });

    } else {
      // ✅ Create department
      this.departmentService.createDepartment(this.department).subscribe(response => {
        console.log('Department created:', response);
        alert('Department created successfully!');
      }, error => {
        console.error('Error creating department:', error);
        alert('Failed to create department.');
      });
    }
  }

  cancel() {
    console.log('Form canceled');
  }
}
