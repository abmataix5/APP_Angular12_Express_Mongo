import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductosComponent } from './filter-productos.component';

describe('FilterProductosComponent', () => {
  let component: FilterProductosComponent;
  let fixture: ComponentFixture<FilterProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
