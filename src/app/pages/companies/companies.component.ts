import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from 'src/app/model/company';
import { Premise } from 'src/app/model/premise';
import { GetPremiseCompaniesService } from 'src/app/services/company/get-premise-companies.service';
import { CurrentPremiseService } from 'src/app/services/shared/current-premise.service';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, AfterViewInit {


  premiseId!: number
  premiseCompanies: Company [] = []
  currentPremise!: Premise

  constructor(
    private route:ActivatedRoute,
    private getPremiseCompaniesService:GetPremiseCompaniesService,
    private currentPremiseService:CurrentPremiseService,
    private router:Router
  ){
    this.currentPremise = this.currentPremiseService.premiseData
    console.log(this.currentPremise.name)
  }

  displayedColumns: string[] = ['name', 'staff_count'];
  dataSource = new MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.premiseId = +params['id']
      }
    )


    this.getPremiseCompaniesService.getCompanies(this.premiseId).subscribe((res) => {
      if(res.statusCode === 702){
        this.premiseCompanies = res.message

        this.dataSource.data = res.message
      }
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


  viewCompanyDetails(id: number){
    this.router.navigate(['company', id])
  }

}
