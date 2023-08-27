import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPremiseService {

  constructor() { 
    if(localStorage.getItem('currentPremise')){
      this.currentPremiseSubject.next(localStorage.getItem('currentPremise'))
    }
  }

  public currentPremiseSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  premiseData$: Observable<any> = this.currentPremiseSubject.asObservable()

  get premiseData(){
    return this.currentPremiseSubject.value
  }
}
