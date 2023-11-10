import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, shareReplay } from 'rxjs';
import { SideMenuFilterService } from 'src/app/services/side-menu-filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm!: FormGroup;

  constructor(
    private _filtersService: SideMenuFilterService
  ) { }

  ngOnInit(): void {

    this.filterForm = new FormGroup({
      date: new FormControl(''),
      title: new FormControl(''),
      group: new FormControl('')
    });

    this.filterForm.valueChanges.pipe(
      
      debounceTime(600),
      distinctUntilChanged(),  
      shareReplay()
    ).subscribe((filters: any) => {
      Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
      this._filtersService.sendFormData(filters)
    });
  }

}
