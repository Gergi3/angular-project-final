import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMaintenanceComponent } from './server-maintenance.component';

describe('ServerMaintenanceComponent', () => {
  let component: ServerMaintenanceComponent;
  let fixture: ComponentFixture<ServerMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
