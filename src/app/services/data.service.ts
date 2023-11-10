import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  // tasksList: any;
tasksList = [
    {
      id: 1,
      title: 'Seaman Cap',
      description: 'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
      date: '2023-11-04',
      group: 'Group A',
      status: 1 // toDo
    },
    {
      id: 2,
      title: 'T-shirt',
      description: 'amet consectetur adipisicing elit.Lorem ipsum dolor sit ',
      price: '$80',
      date: '2023-08-22',
      group: 'Group A',
      status: 1 // toDo
    },
    {
      id: 3,
      title: 'Back Pack',
      description: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
      date: '2023-05-22',
      group: 'Group B',
      status: 1 // toDo
    },
    {
      id: 4,
      title: 'Back Pack dasda',
      description: 'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
      date: '2023-11-01',
      group: 'Group C',
      status: 1 // toDo
    }
  ]

  constructor() {
   }

  createDb() {
    return {
      tasks: this.tasksList
    };
  }
}
