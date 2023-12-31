import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateAccountComponent } from 'src/app/components/accounts/create-account/create-account.component';
import { Shift } from 'src/app/model/shift';
import { GetAccountsService } from 'src/app/services/accounts/get-accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements AfterViewInit, OnInit {


  constructor(private dialog:MatDialog,
    private getAccountsService:GetAccountsService){}

  displayedColumns: string[] = ['accountName', 'description', 'msisdn'];
  dataSource = new MatTableDataSource<Shift>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; 



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.getAccountsService.getAccounts().subscribe((res) => {
      this.dataSource.data = res.data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createAccount() {
    const dialogRef = this.dialog.open(CreateAccountComponent, {
      width: '600px', data: {
     
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
