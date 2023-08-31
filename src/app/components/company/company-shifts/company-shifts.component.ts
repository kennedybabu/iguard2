import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/model/shift';
import { GetCompanyShiftsService } from 'src/app/services/company/get-company-shifts.service';
import { AddShiftComponent } from '../add-shift/add-shift.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-shifts',
  templateUrl: './company-shifts.component.html',
  styleUrls: ['./company-shifts.component.scss']
})
export class CompanyShiftsComponent implements AfterViewInit, OnInit {

  @Input() companyId!: number 
  companyShifts: any [] = []

  constructor(private getCompanyShiftsService: GetCompanyShiftsService,
    private dialog: MatDialog){ }


  ngOnInit(): void {
    this.getCompanyShiftsService.getShifts(this.companyId).subscribe((res) => {
      this.companyShifts = res.message  

      this.dataSource.data = res.message
    })
  }


  displayedColumns: string[] = ['shift_name', 'shift_description', 'type', 'shift_start', 'shift_end'];
  dataSource = new MatTableDataSource<Shift>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  createShift() {
    const dialogRef = this.dialog.open(AddShiftComponent, {
      width:'450px', data: {
        companyId: this.companyId,
   

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyShiftsService.getShifts(this.companyId).subscribe((res) => {
        this.companyShifts = res.message  
  
        this.dataSource.data = res.message
      })
    });
  }

}
