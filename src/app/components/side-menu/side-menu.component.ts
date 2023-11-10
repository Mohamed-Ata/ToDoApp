import { Component, OnInit } from '@angular/core';
import { SideMenuFilterService } from 'src/app/services/side-menu-filter.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isActive: boolean = false;
  menuOpend: boolean = false;
  constructor(
    private _filtersService: SideMenuFilterService
  ) { }

  ngOnInit(): void {
  }

  filterItem(item: string){
    this._filtersService.sendFiltersItems(item)
  }

  toggelMenu(){
    this.menuOpend = !this.menuOpend;
  }
}
