import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
import {DepartmentFormComponent} from "./components/department-form/department-form.component";

const routes: Routes = [
  { path: 'departments', component: DepartmentListComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'department-form', component: DepartmentFormComponent },
  { path: '', redirectTo: '/departments', pathMatch: 'full' },
  { path: '**', redirectTo: '/departments' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
