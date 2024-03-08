import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListViewerComponent } from './event-list-viewer.component';

describe('EventListViewerComponent', () => {
  let component: EventListViewerComponent;
  let fixture: ComponentFixture<EventListViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventListViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
