import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';


import { IAppState } from 'src/app/interfaces/app-state';
import { HttpService } from 'src/app/services/http/http.service';

import { IDepartmentDoctor, Mybookings } from 'src/app/interfaces/department';
import { IOption } from 'src/app/ui/interfaces/option';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
@Component({
  selector: 'app-sloteview',
  templateUrl: './sloteview.component.html',
  styleUrls: ['./sloteview.component.scss']
})
export class SloteviewComponent extends  BasePageComponent implements OnInit, OnDestroy {
  Mybookings: Mybookings[] = [];
  editCache: { [key: string]: { edit: boolean; data: Mybookings } } = {};
  gender: IOption[] = [
    {
      label: 'Male',
      value: 'Male'
    },
    {
      label: 'Female',
      value: 'Female'
    }
  ];
  slides: any[] = [
    {
      img: '/assets/content/department-1.jpg',
      title: 'Chronic Disease and Self-Help Program Lay Leader Training'
    },
    {
      img: '/assets/content/department-2.jpg',
      title: 'BLS Instructor Course'
    },
    {
      img: '/assets/content/department-3.jpg',
      title: 'New Diagnostic Approaches and Therapeutic Interventions”'
    }
  ];

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
   private route:ActivatedRoute,private datePipe:DatePipe
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Slote Details',
      breadcrumbs: [
        {
          title: 'Admin',
          route: 'default-dashboard'
        },
        {
          title: 'Reservation',
          route: 'reservation'
        },
        {
          title: 'Reserved slotes'
        }
      ]
    };
  }
  
  slot_view

slote_id=0;
slotelist=[]

time_slote_id=0;
price=0;
OpenSlote(slote_id,price){
this.price=price;
  this.time_slote_id=slote_id;

}
is_ActveButton=0;

proceed(){

this.is_ActveButton=0
  this.status=''
  this.texttoshow=''





  let ar_obj={
    slote_id:this.slote_id,
    date:  this.date,
    amount_recived:this.price,
    slote_no:this.time_slote_id,
    cust_id:localStorage.getItem('cust_id')
    }
    

    this.httpSv.postdata(ar_obj,'book_slote').subscribe(
      respo => {
        this.status='success'
        this.texttoshow=respo.message
        let source={
          slote_id:this.slote_id,
          date:  this.date
        }
        this.is_ActveButton=1
        
            this.postdata('generateslotes', 'slotelist', 'setLoaded',source);
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

 closeModal() {
  this.is_ActveButton=0;
    this.modal.close();
   
  }
  status
  texttoshow
ProceedPayment(body: any, header: any = null, footer: any = null, data: any = null){

  this.modal.open({
    body: body,
    header: header,
    footer: footer
  });

}


user_type

currentdate="";
date="";
  ngOnInit() {
this.user_type=localStorage.getItem('user_type');

    super.ngOnInit();

    this.route.params.subscribe((params: Params) => {
      this.slote_id = params['value'];
      this.date=this.datePipe.transform(params['date'], 'yyyy-MM-dd');       
      // Use the retrieved value as needed
    });
    this.currentdate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
 
let source={
  slote_id:this.slote_id,
  date:  this.date
}
this.postdata('generateslotes', 'slotelist', 'setLoaded',source);
if(this.user_type=='customer'){
  let source2={
    cust_id:localStorage.getItem('cust_id')
  }
      
      this.postdata('my_bookings', 'Mybookings', 'setLoaded',source2);
  
}


  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  setDoctors(): void {
    this.updateEditCache();
    this.setLoaded();
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

  updateEditCache(): void {
    this.Mybookings.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  saveEdit(id: string): void {
    const index = this.Mybookings.findIndex(item => item.id === id);

    Object.assign(this.Mybookings[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
}
