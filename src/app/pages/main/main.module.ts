import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainAppRoutingModule } from './main-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TasksComponent } from './tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from 'src/app/states/todos/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffect } from 'src/app/states/todos/todo.effect';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MainComponent,
    TasksComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('todos', todosReducer),
    EffectsModule.forFeature([TodoEffect]),
    TranslateModule,
  ]
})
export class MainModule { }
