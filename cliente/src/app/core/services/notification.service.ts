import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr :ToastrService) { }

  Succes(message:any,title:any ){
    this.toastr.success(message,title);
  }

  Error(message:any,title:any ){
    this.toastr.error(message,title);
  }
}
