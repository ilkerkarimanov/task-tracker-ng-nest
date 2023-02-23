import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TaskFilterComponent, pathMatch: 'full' },
  { path: 'filterTasks/:filterMode/:tasksUserName', component: TaskListComponent },
  { path: 'createTask', component: TaskCreateComponent },
  { path: 'editTask/:taskId', component: TaskEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
