import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BreadcrumbModule } from "./components/breadcrumb/breadcrumb.module";
import { TodoTasksComponent } from './pages/todo-tasks/todo-tasks.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';
import { FilterComponent } from './components/filter/filter.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        SideMenuComponent,
        TodoTasksComponent,
        AddEditTaskComponent,
        FilterComponent,
        TaskItemComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataService),
        ToastrModule.forRoot({
            positionClass: 'toast-top-right'
        }),
    ]
})
export class AppModule { }
