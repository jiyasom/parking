import { Component, OnDestroy, OnInit } from '@angular/core';

import { BasePageComponent } from '../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../interfaces/app-state';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainPageComponent extends BasePageComponent implements OnInit, OnDestroy {
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService
  ) {
    super(store, httpSv);

    this.pageData = {
      title: '',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Admin',
          route: 'main'
        },
       
      ]
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.setLoaded();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
