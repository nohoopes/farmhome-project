import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricuturalProductComponent } from './agricutural-product.component';

describe('AgricuturalProductComponent', () => {
  let component: AgricuturalProductComponent;
  let fixture: ComponentFixture<AgricuturalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricuturalProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgricuturalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
