import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Leave } from 'src/app/model/leave';
import { GetCompanyLeaveTypesService } from 'src/app/services/company/get-company-leave-types.service';
import { CreateCompanyLeaveComponent } from '../create-company-leave/create-company-leave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-leaves',
  templateUrl: './company-leaves.component.html',
  styleUrls: ['./company-leaves.component.scss']
})
export class CompanyLeavesComponent implements OnInit, AfterViewInit {

  // companyId!: number 

  @Input() companyId!: number


  constructor(private getCompanyLeaveTypesService:GetCompanyLeaveTypesService,
    private dialog:MatDialog){}


  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<Leave>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getCompanyLeaveTypesService.getLeaveTypes(this.companyId).subscribe((res) => {
      this.dataSource.data = res.message
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

  createCompanyLeave() {
    const dialogRef = this.dialog.open(CreateCompanyLeaveComponent, {
      width:'450px', data: {
        companyId: this.companyId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyLeaveTypesService.getLeaveTypes(this.companyId).subscribe((res) => {
        this.dataSource.data = res.message
      })
    });
  }

}
