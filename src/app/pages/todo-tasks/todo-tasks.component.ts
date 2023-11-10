import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskItem } from 'src/app/model/task.model';
import { listGroup } from 'src/app/model/listGroup.model';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { SideMenuFilterService } from 'src/app/services/side-menu-filter.service';
import { SearchFilter } from 'src/app/model/searchFilter.model';
@Component({
  selector: 'app-todo-tasks',
  templateUrl: './todo-tasks.component.html',
  styleUrls: ['./todo-tasks.component.scss']
})
export class TodoTasksComponent implements OnInit {
  @Output() selected: EventEmitter<any> = new EventEmitter();

  tasksList: TaskItem[] = [];
  groups: listGroup[] = [];

  today: Date = new Date;
  todayString: string;
  isSearch: boolean = false;

  constructor(
    private _crudOperations: CrudOperationsService,
    private _sideFilterService: SideMenuFilterService
  ) { 
    // for comparing current date
    this.today = new Date();
    this.todayString = this.today.toISOString().split('T').slice(0, -1).toString()
  }

  ngOnInit(): void {
    this.getTasks();
    this._sideFilterService.sideFilters$.subscribe({
      next: (res: any) => {
        if(typeof res === 'object' && res !== null){
          this.isSearch = true
          this.getByFilter(this._crudOperations.GetAll(), res)
        } else {
          this.isSearch = false;
          this.getByGroup(this._crudOperations.GetAll(), res)
        }
      },
      error: (err:any) =>{
        console.log(err)
      }
    })
  }

   getTasks() {
    this.getByGroup(this._crudOperations.GetAll())
  }

  getByGroup(arr:[any],status?: string){
    //First, group the tasks by group
    let todosList = [];
    if(status == 'Deleted'){
      todosList = arr.filter(x => x.IsDeleted == true)
    } else if (status == 'Done'){
      todosList = arr.filter(x => x.IsComplete == true && x.IsDeleted == false)
    } else if (status == 'All'){
      todosList = arr
    } else if (status == 'Today'){
      todosList = arr.filter(x => x.date == this.todayString && x.IsDeleted == false)
    } else if (status == 'GroupA'){
      todosList = arr.filter(x => x.group == 'Group A' && x.IsDeleted == false)
    } else if (status == 'GroupB'){
      todosList = arr.filter(x => x.group == 'Group B' && x.IsDeleted == false)
    } else if (status == 'GroupC'){
      todosList = arr.filter(x => x.group == 'Group C' && x.IsDeleted == false)
    } else {
      todosList = arr.filter(x => x.IsComplete == false && x.IsDeleted == false)
    }
    const group = todosList.reduce((acc: any, curr) => {
      let key = curr.group;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});

    //Get the groups and tasks related.
    this.groups = Object.keys(group).map(key => ({
      group: key,
      tasks: group[key]
    })); 
  }
  getByFilter(arr:any,filterForm?: SearchFilter){
   
    const todosList = this._crudOperations.searchObjects(filterForm!, arr)
    
    const group = todosList.reduce((acc: any, curr) => {
      let key = curr.group;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});

    //Get the groups and tasks related.
    this.groups = Object.keys(group).map(key => ({
      group: key,
      tasks: group[key]
    }));
  }
  onTaskSelected(taskId: number) {
    // console.log('Selected Task ID:', taskId);
    // Perform actions with the selected task ID
  }
}
