import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsersAction } from './states/users/user.action';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tareas-test';
  constructor (private store: Store, private translateService: TranslateService) {
    this.store.dispatch(loadUsersAction());
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['es', 'pt']);
    this.translateService.use('en');
  }
}
