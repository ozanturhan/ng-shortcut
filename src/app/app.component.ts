import { Component } from '@angular/core';
import {NgShortcutService, NgShortcut} from 'ng-shortcut';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-shortcut';

  constructor(ngShortcutService: NgShortcutService) {
    ngShortcutService.push(new NgShortcut('F5', () => alert('F5 Refresh'), {
      preventDefault: true
    }));
  }

  test() {
    alert('clicked test button');
  }
}
