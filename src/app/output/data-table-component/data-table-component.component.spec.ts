import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponentComponent } from './data-table-component.component';

describe('DataTableComponentComponent', () => {
  let component: DataTableComponentComponent;
  let fixture: ComponentFixture<DataTableComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
