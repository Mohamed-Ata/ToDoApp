import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
// Breadcrumb component interface
export interface Breadcrumb {
  type?: string;
  alignment?: string;
  pageTitle?: string;
  links?: Array<{
    name: string;
    isLink: boolean;
    link?: string;
  }>;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumb: any = {
    type: 'arrow',
    pageTitle: '',
  }
  constructor(
    private _BreadcrumbService: BreadcrumbService,
  ) { }
  ngOnInit(): void {
    this._BreadcrumbService.Breadcrumb$.subscribe((data: any) => {
      this.breadcrumb = data;
    });
  }

}
