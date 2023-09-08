import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beacon } from 'src/app/model/beacon';
import { CreatePremiseAppointmentTagComponent } from '../create-premise-appointment-tag/create-premise-appointment-tag.component';
import { MatDialog } from '@angular/material/dialog';
import { GetPremiseAppointmentTagsService } from 'src/app/services/premise/get-premise-appointment-tags.service';

@Component({
  selector: 'app-premise-appointment-tags',
  templateUrl: './premise-appointment-tags.component.html',
  styleUrls: ['./premise-appointment-tags.component.scss']
})
export class PremiseAppointmentTagsComponent implements OnInit  {

  @Input() premiseId!: number 

  constructor(
    private dialog:MatDialog,
    private getPremiseAppointmenttagsService:GetPremiseAppointmentTagsService
  ){}

  displayedColumns: string[] = ['access', 'description'];
  dataSource = new MatTableDataSource<Beacon>;

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


  ngOnInit(): void {
    this.getPremiseAppointmenttagsService.getTags(this.premiseId).subscribe((res) =>{
      this.dataSource.data = res.message
    })
  }



  openDialog() {
    const dialogRef = this.dialog.open(CreatePremiseAppointmentTagComponent, {
      width: '450px', minHeight:'500px',
      data: {
        premiseId: this.premiseId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPremiseAppointmenttagsService.getTags(this.premiseId).subscribe((res) =>{
        this.dataSource.data = res.message
      })
    });
  }


}
