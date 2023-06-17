import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSloteSettingsComponent } from './slote-settings.component';

describe('PageAppointmentsComponent', () => {
  let component: PageSloteSettingsComponent;
  let fixture: ComponentFixture<PageSloteSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSloteSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSloteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
