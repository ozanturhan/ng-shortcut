import {Component, HostListener} from '@angular/core';
import {NgShortcutService} from './services/ng-shortcut.service';

@Component({
  selector: 'ng-shortcut',
  template: ``
})
export class NgShortcutComponent {
  constructor(private ngShortcutService: NgShortcutService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.ngShortcutService.fire(event);
  }
}
