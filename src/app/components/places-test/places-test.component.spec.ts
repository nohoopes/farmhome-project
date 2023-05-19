import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesTestComponent } from './places-test.component';

describe('PlacesTestComponent', () => {
  let component: PlacesTestComponent;
  let fixture: ComponentFixture<PlacesTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacesTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
