import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { TaskItem } from 'src/app/model/task.model';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { CrudTasksService } from 'src/app/services/crud-tasks.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  _unsubscribeAll = new Subject<any>();
  
  taskForm!: FormGroup;
  currentTaskId: number | undefined;
  currentTask!: TaskItem
  isDetails: boolean = false;
  formSubmitted: boolean = false;
  maxMinDate: Date;

  constructor(
    private _helperService: HelperService,
    private _crudOperations: CrudOperationsService,
    private _activatedRoute: ActivatedRoute,
  ) { 
    this.maxMinDate = new Date();
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      group: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });

    // this._activatedRoute.params
    //   .pipe(
    //     takeUntil(this._unsubscribeAll),
    //     switchMap(res => {
    //       if (res['id']) {
    //         this.currentTaskId = res['id'];
    //         this.isEditing = true;
    //         // return this._crudService.getTaskById(Number(res['id']))
    //         return this._crudOperations.getTaskById(Number(res['id']))
    //       } else
    //         return [];
    //     }),
    //   ).subscribe({
    //     next: (res: any) => {
    //       this.currentTask = res ? res : [];
    //       this.taskForm.patchValue(this.currentTask);
    //     },
    //     error: (err) => {
    //       this._helperService.handleError(err);
    //     }
    //   });

    this.currentTaskId = this._activatedRoute.snapshot.params['id'];
    

    if(this.currentTaskId ){
      this.isDetails = true;
      this.currentTask = this._crudOperations.getTaskById(Number(this.currentTaskId));
      this.taskForm.patchValue(this.currentTask);
      this.taskForm.disable()
    } else {
      this.isDetails = false
    }
  }


    // create or edit role
    saveData() {
      const taskData = {
        IsComplete: false,
        IsDeleted: false,
        selected: false,
        ...this.taskForm.value
      }
      
  
      this.formSubmitted = true;
        if (this.taskForm.valid) {
          this._crudOperations.Add(taskData);
          this.taskForm.reset();
          this.formSubmitted = false;
          this._helperService.handleCustomSuccess('Task Added Successfully');
          

          // this._crudService.createTask(taskData).pipe(
          //   takeUntil(this._unsubscribeAll)
          // ).subscribe({
          //   next: (res: any) => {
          //     this._helperService.handleCustomSuccess('Task Added Successfully');
          //     console.log(this.taskForm.value)
          //     this.taskForm.reset();
          //     this.formSubmitted = false;
          //     // localStorage.setItem('tasksList', JSON.stringify(this.tasksList))
          //   },
          //   error: (err) => {
          //     this._helperService.handleError(err);
          //   }
          // });
        }
    }

    ngOnDestroy() {
      // prevent memory leak when component destroyed
      this._unsubscribeAll.next(true);
      this._unsubscribeAll.complete();
    }
}
