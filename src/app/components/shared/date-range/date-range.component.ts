import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent {


  @Output() rangeRangeSelected = new EventEmitter<{start:any, end: any}>()

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  submitDate(){
    const startDate = this.range.controls['start'].value 
    const endDate = this.range.controls['end'].value 

    this.rangeRangeSelected.emit({start: startDate, end: endDate})
    
    console.log(startDate, endDate)

  }

}
