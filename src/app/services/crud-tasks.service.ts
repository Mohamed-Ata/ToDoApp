import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { TaskItem } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class CrudTasksService {

  constructor(private _http: HttpClient) { }


  private tasksUrl = 'api/tasks/';


  getTasks(): Observable<TaskItem[]> {
    return this._http.get<TaskItem[]>(this.tasksUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createTask(task: TaskItem): Observable<TaskItem> {
    // task.id = null;
    return this._http.post<TaskItem>(this.tasksUrl, task).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editTask(task: TaskItem): Observable<any> {
    return this._http.put(this.tasksUrl + task.id, task);
  }
  getTaskById(taskId: Number): Observable<any> {
    return this._http.get<Task[]>(this.tasksUrl + taskId);
  }

  deleteTask(id: number): Observable<any> {
    return this._http.delete(this.tasksUrl + id);
  }

  // completeTask()

}
