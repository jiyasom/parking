import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { HttpService } from 'src/app/services/http/http.service';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'src/app/ui/interfaces/option';
import { Mybookings } from 'src/app/interfaces/department';
@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss']
})
export class AllReservationsComponent extends BasePageComponent implements OnInit, OnDestroy {


  bookings: Mybookings[] = [];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Reservation',
      breadcrumbs: [
        {
          title: 'Admin',
          route: 'default-dashboard'
        },
        {
          title: 'Reservation'
        }
      ]
    };
   
  }

  ngOnInit() {
    super.ngOnInit();
 

    this.postdata('GET_all_the_reservations', 'bookings', 'setLoaded',{});
  

    

  }












}
