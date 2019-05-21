import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgShortcutDirective} from './directives/ng-shortcut-directive';
import {NgShortcutConfig} from './models/ng-shortcut-config';
import {NgShortcutConfigService} from './services/ng-shortcut-config.service';
import {NgShortcutService} from './services/ng-shortcut.service';
import {NgShortcutComponent} from './ng-shortcut.component';

@NgModule({
  declarations: [NgShortcutComponent, NgShortcutDirective],
  imports: [
  ],
  exports: [NgShortcutComponent, NgShortcutDirective]
})
export class NgShortcutModule {
  static forRoot(config?: NgShortcutConfig[]): ModuleWithProviders {
    return {
      ngModule: NgShortcutModule,
      providers: [
        NgShortcutService,
        {
          provide: NgShortcutConfigService,
          useValue: config
        }
      ]
    };
  }
}
