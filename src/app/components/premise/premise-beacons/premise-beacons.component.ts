import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beacon } from 'src/app/model/beacon';
import { GetPremiseBeaconsService } from 'src/app/services/premise/get-premise-beacons.service';
import { AddPremiseBeaconsComponent } from '../add-premise-beacons/add-premise-beacons.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-premise-beacons',
  templateUrl: './premise-beacons.component.html',
  styleUrls: ['./premise-beacons.component.scss']
})
export class PremiseBeaconsComponent implements OnInit, AfterViewInit {

  @Input() premiseId!: number

  displayedColumns: string[] = ['Signature', 'description'];
  dataSource = new MatTableDataSource<Beacon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private getPremiseBeaconsService:GetPremiseBeaconsService,private dialog: MatDialog){}


  ngOnInit(): void {
    this.getPremiseBeaconsService.getPremiseBeacons(this.premiseId).subscribe((res) => {
      this.dataSource.data = res.message.Beacons.Beacons
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

  openDialog() {
    const dialogRef = this.dialog.open(AddPremiseBeaconsComponent, {
      width: '400px', height: '300px',
      data: {
        premiseId: this.premiseId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPremiseBeaconsService.getPremiseBeacons(this.premiseId).subscribe((res) => {
        this.dataSource.data = res.message.Beacons.Beacons
      })
    });
  }
}
