import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemProductosComponent } from './list-item-productos.component';

describe('ListItemProductosComponent', () => {
  let component: ListItemProductosComponent;
  let fixture: ComponentFixture<ListItemProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
