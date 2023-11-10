import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItem } from 'src/app/model/task.model';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task!: TaskItem;
  @Output() actionDone = new EventEmitter<boolean>();
  @Output() taskSelected = new EventEmitter<number>();

  constructor(
    private _crudOperations: CrudOperationsService
  ) { }

  ngOnInit(): void {
  }


  deleteTask(taskId: number){
    this._crudOperations.deleteTask(taskId - 1, false);
    this.actionDone.emit(true)
  }

  completeTask(taskId: number){
    this._crudOperations.completeTask(taskId - 1, false);
    this.actionDone.emit(true)
  }

  onTaskSelectionChange() {
    if (this.task.selected) {
      this.taskSelected.emit(this.task.id);
    } else {
      // this.taskSelected.emit(-1)
    }
  }

}
