import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'src/app/model/staff';
import { GetCompanyDesignationsService } from 'src/app/services/company/get-company-designations.service';
import { CreateCompanyDesignationComponent } from '../create-company-designation/create-company-designation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-designations',
  templateUrl: './company-designations.component.html',
  styleUrls: ['./company-designations.component.scss']
})
export class CompanyDesignationsComponent implements OnInit, AfterViewInit {

  @Input() companyId!: number

  constructor(
    private getCompanyDesignationsService:GetCompanyDesignationsService,
    private dialog:MatDialog
  ){}

  displayedColumns: string[] = ['name', 'description'];
  dataSource = new MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getCompanyDesignationsService.getDesignations(this.companyId).subscribe((res) => {
      console.log(res)
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

  createCompanyDesignation() {
    const dialogRef = this.dialog.open(CreateCompanyDesignationComponent, {
      width:'450px', data: {
        companyId: this.companyId,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompanyDesignationsService.getDesignations(this.companyId).subscribe((res) => {
        this.dataSource.data = res.message
      })
    });
  }
      

}
