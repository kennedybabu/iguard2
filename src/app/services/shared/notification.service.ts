import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private errorMessage = new Subject<string>()
  private successMessage = new Subject<string>()

  constructor() { }

  sendErrorMessage(message: string) {
    this.errorMessage.next(message)
  }

  sendSuccessMessage(message: string){
    this.successMessage.next(message)
  }

  getSuccessMsg(){
    return this.successMessage.asObservable()
  }

  getMessage(){
    return this.errorMessage.asObservable()
  }
}
