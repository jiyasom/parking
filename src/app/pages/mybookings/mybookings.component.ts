





import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';


import { IAppState } from 'src/app/interfaces/app-state';
import { HttpService } from 'src/app/services/http/http.service';

import {  Mybookings } from 'src/app/interfaces/department';

import { TCModalService } from 'src/app/ui/services/modal/modal.service';











@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent extends BasePageComponent implements OnInit, OnDestroy {
  Mybookings: Mybookings[] = [];
  editCache: { [key: string]: { edit: boolean; data: Mybookings } } = {};

  user_type

constructor( store: Store<IAppState>,
  httpSv: HttpService,
  private modal: TCModalService){

  super(store, httpSv);

  this.pageData = {
    title: 'Slote Details',
    breadcrumbs: [
      {
        title: 'Customer',
        route: 'default-dashboard'
      },
      {
        title: 'Reservation',
        route: 'reservation'
      },
      {
        title: 'My Bookings'
      }
    ]
  };


}


reservation_id_selected=0
  startEdit(id,body: any, header: any = null, footer: any = null, data: any = null): void {
    this.reservation_id_selected=id;
    this.modal.open({
      body: body,
      header: header,
      footer: footer
    });
  }




  findObjectByValue(array: Mybookings[], searchValue): Mybookings | undefined {
    return array.find(obj => obj.reservations_id === searchValue);
  }
  
  CancleSlote(){
let ar_obj="reservations_id="+this.reservation_id_selected

let foundObject = this.findObjectByValue(this.Mybookings, this.reservation_id_selected);

    this.httpSv.DeleteData(ar_obj,'delete_reservation').subscribe(
      respo => {




        this.status='success'
        this.texttoshow=respo.message
        let source={
          slote_id:this.slote_id,
          date:  this.date
        }
        this.is_ActveButton=1
        
        this.Mybookings = this.Mybookings.filter(row => row !== foundObject);
          
      },
      err => {
        console.log(err);

        this.status='warning'
        this.texttoshow=err.message
      },
      () => {
      
      }
    );




  }

  cancelEdit(id: string): void {
    const index = this.Mybookings.findIndex(item => item.id === id);

    this.editCache[id] = {
      data: { ...this.Mybookings[index] },
      edit: false
    };
  }



  is_ActveButton=0
  status=''
  texttoshow=''
  slote_id=0;
  time_slote_id=0;
  price=0;
  date="";


  closeModal() {
    this.is_ActveButton=0;
      this.modal.close();
     
    }



ngOnInit() {
  super.ngOnInit();


  let source2={
    cust_id:localStorage.getItem('cust_id')
  }
      
      this.postdata('my_bookings', 'Mybookings', 'setLoaded',source2);
}
}
