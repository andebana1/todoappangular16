import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { createTodoAction } from 'src/app/states/todos/todo.action';
import { selectUsersList } from 'src/app/states/users/user.selector';
import { Observable } from 'rxjs';
import { createUserAction } from 'src/app/states/users/user.action';
import { TranslateModule } from '@ngx-translate/core';
import { IUser } from 'src/app/models/user.model';


@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    TranslateModule,
  ],
  providers: [ 
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent {

  formGroupTasks?: FormGroup;
  newUserForm?: FormGroup;
  newUserExpanded = false;
  users$: Observable<IUser[]> = this.store.select(selectUsersList);

  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.formGroupTasks = this.createForm();
    this.newUserForm = this.createForm(true);
  }

  createForm(isNewUser = false): FormGroup {
    if (isNewUser) {
      return this.fb.group({
        fullName: [null, Validators.required],
        age: [null, [Validators.required, Validators.min(18)]],
        skills: [[], [Validators.required, Validators.minLength(1)]],
        skillsInput: [null],
      });
    }
    return this.fb.group({
      title: [null, Validators.required],
      deadline: [null, Validators.required],
      completed: [false],
      associatedUsers: [[], [Validators.required, noRepeatedUsersValidator()]],
    });
  }

  get skills(): FormControl {
    return this.newUserForm?.get('skills') as FormControl;
  }

  addSkill(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value) {
      this.skills.value.push(value); // Add chip to array
      this.newUserForm?.get('skillsInput')?.setValue(''); // Reset the input field
    }
  }

  removeSkill(index: number): void {
    this.skills.value.splice(index, 1);
  }

  private get newid () {
    return Math.floor(Math.random() * 10000);
  }

  createUser () {
    const newUser = this.newUserForm?.value;
    delete newUser.skillsInput;
    newUser.id = this.newid;
    this.store.dispatch(createUserAction({user: newUser}));
    this.newUserForm = this.createForm(true);
    this.newUserExpanded = false;
  }

  saveTask () {
    const newTask = this.formGroupTasks?.value;
    newTask.id = this.newid;
    newTask.deadline = newTask.deadline.toISOString();
    newTask.associatedUsers = newTask.associatedUsers.map((user: IUser) => Number(user.id));
    this.store.dispatch(createTodoAction({todo: newTask}));
    this.dialogRef.close();
  }

}

function noRepeatedUsersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const userNamesSet = new Set();
    let isValid = true;
    for (const user of control.value) {
      if (userNamesSet.has(user.fullName)) {
        isValid = false;
        break;
      }
      userNamesSet.add(user.fullName);
    }
    return  isValid ? null : { userNameAlreayRelated: true };;
  }
}
