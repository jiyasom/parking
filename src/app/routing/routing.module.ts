import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalLayoutComponent } from '../layout/vertical';
import { HorizontalLayoutComponent } from '../layout/horizontal';
import { PublicLayoutComponent } from '../layout/public';

import { MainPageComponent } from '../pages/main/main.component';
import { Page404Component } from '../pages/page-404';
import { PageSignInComponent } from '../pages/sign-in';
import { PageSignUpComponent } from '../pages/sign-up';
import { AuthGuard } from '../layout/components/login-form/auth.guard';
import { PageSloteSettingsComponent } from '../pages/appointments';
import { ReservationComponent } from '../pages/reservation/reservation.component';
import { CustomersListComponent } from '../pages/customers-list/customers-list.component';
import { SloteviewComponent } from '../pages/sloteview/sloteview.component';
import { AllReservationsComponent } from '../pages/all-reservations/all-reservations.component';
import { MybookingsComponent } from '../pages/mybookings/mybookings.component';











const privateRoutes: Routes = [

  {path:'slote_settings',component:PageSloteSettingsComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'customers',component:CustomersListComponent},
  {path:'slot_view',component:SloteviewComponent},
  {path:'all_reservations',component:AllReservationsComponent},
  {path:'my_bookings',component:MybookingsComponent}

];











const customer: Routes = [
  { path: 'main', component: MainPageComponent },
];






const publicRoutes: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  { path: 'page-404', component: Page404Component },
  { path: '**', component: PageSignInComponent }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/public/sign',
    pathMatch: 'full'
  },
  {
    path: 'vertical',
    component: VerticalLayoutComponent,
    children: privateRoutes,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: VerticalLayoutComponent,
    children: customer,
    canActivate: [AuthGuard]
  },



  {
    path: 'horizontal',
    component: HorizontalLayoutComponent,
    children: privateRoutes
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: publicRoutes
  },
  {
    path: '**',
    component: PublicLayoutComponent,
    children: publicRoutes
  }
];

@NgModule({
  imports: [],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
