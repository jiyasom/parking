import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { HttpService } from 'src/app/services/http/http.service';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'src/app/ui/interfaces/option';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent extends BasePageComponent implements OnInit, OnDestroy {

  departments: any[];

  car_type: IOption[];
  shade:IOption[];
  disable_person:IOption[];
  visible:IOption[];

  date: Date;


  is_ActveButton
  texttoshow



  appointmentForm: FormGroup;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private router:Router

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
    this.departments = [];
  }
user_type
  ngOnInit() {


    super.ngOnInit();
    this.getData('assets/data/shade.json', 'shade');
    this.getData('assets/data/active_inactive.json', 'disable_person');
    this.getData('assets/data/active_inactive.json', 'visible');
    this.getData('assets/data/vehicle_type.json', 'car_type');
    this.getData('http://localhost:3000/api/create_slote', 'slotelist', 'setLoaded');
this.initForm();
    

this.user_type=localStorage.getItem('user_type')

  }

formarray
slotelist:any=[]
  search(){
   this.slotelist=[]

     this.postdata('slot-settings', 'slotelist', 'setLoaded',this.appointmentForm.value);
  }

is_open_moveNext=0;
routeTeNext(id){
  

// alert('haiiiiiiiiiii')

this.router.navigate(['vertical/slot_view',{ value:id , date: this.appointmentForm.value.date}] );
 
}




  initForm() {
    this.appointmentForm = this.formBuilder.group({
      car_type: ['', Validators.required],
  disable_person: [0, Validators.required],
  shade: ['', Validators.required],
  date: ['', Validators.required]
    });

  }






  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
