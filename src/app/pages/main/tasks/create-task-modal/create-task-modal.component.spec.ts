import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskModalComponent } from './create-task-modal.component';

describe('CreateTaskModalComponent', () => {
  let component: CreateTaskModalComponent;
  let fixture: ComponentFixture<CreateTaskModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateTaskModalComponent]
    });
    fixture = TestBed.createComponent(CreateTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
