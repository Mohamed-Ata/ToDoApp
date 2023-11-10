import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoTasksComponent } from './pages/todo-tasks/todo-tasks.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';

const routes: Routes = [
  {
    path:'tasks-list',
    component: TodoTasksComponent
  },
  {
    path:'add-task',
    component: AddEditTaskComponent
  },
  {
    path:'edit-task/:id',
    component: AddEditTaskComponent
  },
  {
    path:'task-details/:id',
    component: AddEditTaskComponent
  },
  { path: '**', redirectTo: 'tasks-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
