import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  mobileQuery?: MediaQueryList;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private translateService: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery?.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  changeLang(lang: string) {
    this.translateService.use(lang);
  }
}
