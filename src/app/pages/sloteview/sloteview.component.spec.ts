import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SloteviewComponent } from './sloteview.component';

describe('SloteviewComponent', () => {
  let component: SloteviewComponent;
  let fixture: ComponentFixture<SloteviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SloteviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SloteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
