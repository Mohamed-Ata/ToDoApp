import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  private Breadcrumb$$ = new BehaviorSubject<any>([]);
  public Breadcrumb$ = this.Breadcrumb$$.asObservable();

  passValue(values:any) {
    this.Breadcrumb$$.next(values);

  }

}
