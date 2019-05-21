import { Directive, HostListener, ElementRef, Input, OnInit, OnDestroy  } from '@angular/core';
import {NgShortcut} from '../models/ng-shortcut';
import {NgShortcutService} from '../services/ng-shortcut.service';

@Directive({
  selector: '[ngShortcut]'
})
export class NgShortcutDirective implements OnInit, OnDestroy {
  @Input('ngShortcut') key: string;
  @Input('ctrlKey') ctrlKey: boolean;
  @Input('altKey') altKey: boolean;
  @Input('shiftKey') shiftKey: boolean;
  @Input('priority') priority = 0;
  @Input('preventDefault') preventDefault: boolean;

  private shortcutObj: NgShortcut;

  constructor(private elementRef: ElementRef, private shortcutService: NgShortcutService) {}

  ngOnInit() {
    this.shortcutObj = new NgShortcut(this.key, this.elementRef, {
      priority: this.priority,
      altKey: this.altKey,
      shiftKey: this.shiftKey,
      ctrlKey: this.ctrlKey,
      preventDefault: this.preventDefault,
    });

    this.shortcutService.push(this.shortcutObj);
  }

  ngOnDestroy() {
    this.shortcutService.remove(this.shortcutObj);
  }
}
