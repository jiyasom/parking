import { Component,OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { IAppState } from 'src/app/interfaces/app-state';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent extends BasePageComponent implements OnInit, OnDestroy{


  customers:any=[];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
   
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Customer List',
      breadcrumbs: [
        {
          title: 'Admin',
          route: 'default-dashboard'
        },
        {
          title: 'Slote List'
        }
      ]
    };
    this.customers = [];
  
  }


  ngOnInit() {
    super.ngOnInit();

    this.postdata('get_customer_data', 'customers', 'setLoaded',{});
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }



}
