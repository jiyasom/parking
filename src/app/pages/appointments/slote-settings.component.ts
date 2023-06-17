import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';



import { BasePageComponent } from '../base-page';
import { IAppState } from 'src/app/interfaces/app-state';
import { HttpService } from 'src/app/services/http/http.service';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import { slote_settings } from 'src/app/ui/interfaces/user';
import { IOption } from 'src/app/ui/interfaces/option';

@Component({
  selector: 'page-slote-settings',
  templateUrl: './slote-settings.component.html',
  styleUrls: ['./slote-settings.component.scss']
})
export class PageSloteSettingsComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;



  date: Date;
  dateRange: Date[];
  size: string;
  dateMode: string;




	car_type: IOption[];
  shade:IOption[];
  disable_person:IOption[];
  visible:IOption[];
  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
 

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Parking Slote List',
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
    this.appointments = [];

    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getData('assets/data/shade.json', 'shade');
    this.getData('assets/data/active_inactive.json', 'disable_person');
    this.getData('assets/data/active_inactive.json', 'visible');


    this.getData('assets/data/vehicle_type.json', 'car_type');
    this.GET_API_DATA('create_slote', 'appointments', 'setLoaded');



    this.date = null;
    this.dateRange = [];
    this.size = 'default';
    this.dateMode = 'time';
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  openModal(body: any, header: any = null, footer: any = null, data: any = null) {
    this.type='add'
    this.initForm(data);
    this.status=''
    this.texttoshow=''
    this.modal.open({
      body: body,
      header: header,
      footer: footer
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.appointmentForm.reset();
  }

  // init form
  initForm(data: any) {
    this.appointmentForm = this.formBuilder.group({
      slote_id: [(data ? data.slote_id : 0), Validators.required],
      car_type: [(data ? data.car_type : ''), Validators.required],
  disable_person: [(data ? data.disable_person : ''), Validators.required],
  shade: [(data ? data.shade : ''), Validators.required],
  price: [(data ? data.price : ''), Validators.required],
  visible: [(data ? data.visible : ''), Validators.required],
  start_time: [(data ? data.start_time : ''), Validators.required],
end_time: [(data ? data.end_time : ''), Validators.required],

slot_count: [(data ? data.slot_count : 0), Validators.required],

    });
  }




  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };

    reader.readAsDataURL(file);
  }
type=''
  // edit appointment
  edit(row: any) {
   this.type='edit'
    this.openModal(this.modalBody, 'Add Slote', this.modalFooter, row);
  }

  // remove appointment
  remove(tableRow: any) {
    this.type='remove'


    let Appointment: any = {
      slote_id:tableRow.slote_id
    };
      this.httpSv.DeleteData(Appointment,'create_slote').subscribe(
        respo => {
          this.appointments = this.appointments.filter(row => row !== tableRow);
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
  status=''
  texttoshow=''
  // add new appointment

  
  isStartTimeGreaterThanEndTime: boolean = false;

  checkTime(startTime,endTime) {
    const startDateTime = new Date();
    const endDateTime = new Date();

    // Set the time values without the date portion
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    startDateTime.setHours(Number(startHour), Number(startMinute));
    endDateTime.setHours(Number(endHour), Number(endMinute));
let is_greater:boolean=startDateTime > endDateTime;
    return is_greater
  }


 


  calculateSlots(startTime,endTime) {
    const startDateTime = new Date();
    const endDateTime = new Date();

    // Set the time values without the date portion
    const [startHour, startMinute] = startTime.split(':');
    const [endHour, endMinute] = endTime.split(':');

    startDateTime.setHours(Number(startHour), Number(startMinute), 0);
    endDateTime.setHours(Number(endHour), Number(endMinute), 0);

    const duration = 60 * 60 * 1000; // Duration in milliseconds (1 hour)
    const timeDifference = endDateTime.getTime() - startDateTime.getTime();

  let slotCount = Math.floor(timeDifference / duration);
  return slotCount
  }


  add(form: FormGroup) {
    

    this.status=''
    this.texttoshow=''
    let newAppointment: any = form.value;
    
    if(  this.checkTime(newAppointment.start_time,newAppointment.end_time)){
      this.status='warning'
      this.texttoshow='Start time cannot be greater than End Time'
return false
    } else if ( this.calculateSlots(newAppointment.start_time,newAppointment.end_time) <1){

      this.status='warning'
      this.texttoshow='U are enterd wrong time lest need 1 hr duration'
return false

    }
    newAppointment.slot_count=this.calculateSlots(newAppointment.start_time,newAppointment.end_time)

    if (form.valid &&  this.type=='add') {
     




      this.httpSv.postdata(newAppointment,'create_slote').subscribe(
        respo => {
          this.status='success'
          this.texttoshow=respo.message
          newAppointment.slote_id=respo.data.insertId;
          this.appointments.unshift(newAppointment);
          let newTableData = JSON.parse(JSON.stringify(this.appointments));
    
          this.appointments = newTableData;
          this.closeModal();
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


   else if (form.valid &&  this.type=='edit') {
  
      this.httpSv.putData(newAppointment,'create_slote').subscribe(
        respo => {
          this.status='success'
          this.texttoshow=respo.message
         
          this.appointments.unshift(newAppointment);
          let newTableData = JSON.parse(JSON.stringify(this.appointments));
    
          this.appointments = newTableData;
          this.closeModal();
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





  }
}
