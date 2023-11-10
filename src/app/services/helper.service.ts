import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  successString: string = 'Success';
  errorString: string = 'Error';

  constructor(
    private _toasterService: ToastrService
  ) { }


  handleSuccess(res: any){
    this._toasterService.success(res?.message,this.successString);
  }

  handleError(res: any){
    this._toasterService.error(res?.error?.errors[0],this.errorString)
  }

  handleCustomSuccess(customMessage:string){
    this._toasterService.success(customMessage,this.successString);
  }

  handleCustomError(customMessage:string){
    this._toasterService.error(customMessage,this.errorString)
  }
}
