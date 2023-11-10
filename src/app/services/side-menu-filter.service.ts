import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuFilterService {

  private _sideItemsFilters = new Subject<string>();
  sideFilters$ = this._sideItemsFilters.asObservable();

  constructor() { }

  sendFiltersItems(filterItem: string){
    this._sideItemsFilters.next(filterItem)
  }

  sendFormData(formData: any){
    this._sideItemsFilters.next(formData)
  }
}
