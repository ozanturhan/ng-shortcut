import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgShortcutModule} from 'ng-shortcut';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgShortcutModule.forRoot([{
      id: 'save',
      key: 'F1',
      preventDefault: true,
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
