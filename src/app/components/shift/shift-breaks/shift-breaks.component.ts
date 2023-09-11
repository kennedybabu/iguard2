import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreateShiftBreakComponent } from '../create-shift-break/create-shift-break.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Staff } from 'src/app/model/staff';
import { GetShiftBreaksService } from 'src/app/services/shift/get-shift-breaks.service';

@Component({
  selector: 'app-shift-breaks',
  templateUrl: './shift-breaks.component.html',
  styleUrls: ['./shift-breaks.component.scss']
})
export class ShiftBreaksComponent  implements OnInit, AfterViewInit {

  constructor(
    private dialog:MatDialog,
    private getShiftBreaksService:GetShiftBreaksService
  ){}

  displayedColumns: string[] = ['description' , 'name', ];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() shiftId!: number 

  ngOnInit(): void {

    this.getShiftBreaksService.getBreaks(this.shiftId).subscribe((res) => {
      this.dataSource.data = res?.message
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createShiftBreak() {
    const dialogRef = this.dialog.open(CreateShiftBreakComponent, {
      width:'450px', height: '400px', data: {
        shiftId : this.shiftId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getShiftBreaksService.getBreaks(this.shiftId).subscribe((res) => {
        this.dataSource.data = res?.message  
      })
    });
  }

}
