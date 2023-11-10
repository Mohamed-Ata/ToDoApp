import { Injectable } from '@angular/core';
import { TaskItem } from '../model/task.model';
import { SearchFilter } from '../model/searchFilter.model';
@Injectable({
  providedIn: 'root'
})
export class CrudOperationsService {
  todosList: any;

  constructor() { 
    this.todosList = []
  }

  Add(task: TaskItem) {
    task.id = this.autoCompleteId();
    this.todosList.push(task);
    this.Save();
  }
  autoCompleteId(){
    let index = this.todosList.length;
    return index + 1
  }

  GetAll() {
    let value = localStorage.getItem("todos");
    if (value != '' && value != null && typeof value != "undefined") {
      return this.todosList = JSON.parse(value!);
    }
  }

  getTaskById(id: Number) {
    let value = localStorage.getItem("todos");
    if (value != '' && value != null && typeof value != "undefined") {
      this.todosList = JSON.parse(value!);
    }
    return this.todosList.find((x:any) => x.id == id)
  }


  Delete(index: Number) {
    if (this.todosList.length > index) {
      this.todosList.splice(index, 1);
      // this.deletedList.push()
      this.Save();
    }
  }
  
  DeleteAll() {
    this.todosList = [];
    this.Save();
  }


  completeTask(index: number, currentValue: boolean) {
    if (this.todosList.length > index) {
      let obj = this.todosList[index];
      if (obj != null && typeof obj != "undefined") {
        obj.IsComplete = !currentValue;
        this.todosList[index] = obj;
        this.Save();
      }
    }
  }

  deleteTask(index: number, currentValue: boolean) {
    if (this.todosList.length > index) {
      let obj = this.todosList[index];
      if (obj != null && typeof obj != "undefined") {
        obj.IsDeleted = !currentValue;
        this.todosList[index] = obj;
        this.Save();
      }
    }
  }

  Save() {
    localStorage.setItem("todos", JSON.stringify(this.todosList));
  }

  searchObjects(searchItems: SearchFilter, dataArray: TaskItem[]): TaskItem[] {
    let arr = dataArray.filter(x => x.IsDeleted == false)
    return arr.filter((dataObj: SearchFilter) => {
      const nameMatch = !searchItems.title || dataObj.title!.toLowerCase().includes(searchItems.title.toLowerCase());
      const groupMatch = !searchItems.group || dataObj.group!.toLowerCase().includes(searchItems.group.toLowerCase());
      const dateMatch = !searchItems.date || searchItems.date === dataObj.date!;  
      return nameMatch && groupMatch && dateMatch;
    });
  }
}
