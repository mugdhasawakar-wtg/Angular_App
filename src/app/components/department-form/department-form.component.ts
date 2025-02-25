import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent {
  @Input() isEdit: boolean = false;
  @Input() department: any = { name: '', readOnly: false, mandatory: false };
  @Input() showModal: boolean = false; // ✅ Get from parent
  @Output() departmentSaved = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>(); // ✅ Notify parent to close modal

  constructor(private departmentService: DepartmentService) {}

  onSubmit() {
    if (this.isEdit) {
      // const updatePayload = {
      //   id: this.department.id,
      //   name: this.department.name,
      //   readOnly: this.department.readOnly,
      //   mandatory: this.department.mandatory
      // };
      console.log('Updating department:', this.department);
      this.departmentService.updateDepartment(this.department.id, this.department).subscribe(response => {
        console.log('Department updated:', response);
        alert('Department updated successfully!');
        this.departmentSaved.emit();
        this.close.emit(); // ✅ Close modal after saving
      }, error => {
        console.error('Error updating department:', error);
        alert('Failed to update department.');
      });

    } else {
      this.departmentService.createDepartment(this.department).subscribe(response => {
        console.log('Department created:', response);
        alert('Department created successfully!');
        this.departmentSaved.emit();
        this.close.emit(); // ✅ Close modal after saving
      }, error => {
        console.error('Error creating department:', error);
        alert('Failed to create department.');
      });
    }
  }

  closeModal() {
    this.close.emit(); // ✅ Notify parent to close modal
  }
}
