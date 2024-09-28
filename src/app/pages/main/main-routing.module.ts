import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' } // Default to /home
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }