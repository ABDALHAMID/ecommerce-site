import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingelProductComponent } from './singel-product.component';

describe('SingelProductComponent', () => {
  let component: SingelProductComponent;
  let fixture: ComponentFixture<SingelProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingelProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
