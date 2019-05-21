import { Injectable, ElementRef, Inject } from '@angular/core';
import { NgShortcut } from '../models/ng-shortcut';
import { NgShortcutConfig } from '../models/ng-shortcut-config';
import { NgShortcutConfigService } from './ng-shortcut-config.service';

@Injectable({
  providedIn: 'root'
})
export class NgShortcutService {
  private shortcuts: NgShortcut[] = [];
  private shortcutConfig: NgShortcutConfig[];

  constructor(@Inject(NgShortcutConfigService) private config?) {
    this.shortcutConfig = config;
  }

  resetConfig() {
    this.shortcutConfig = [];
  }

  updateConfig(config: NgShortcutConfig[]) {
    this.shortcutConfig = config;
  }

  push(shortcut: NgShortcut): NgShortcut {
    const foundedShortcut = this.shortcutConfig ? this.shortcutConfig.find(data => shortcut.key === data.id &&
      shortcut.ctrlKey === data.ctrlKey &&
      shortcut.altKey === data.altKey &&
      shortcut.shiftKey === data.shiftKey) : null;

    if (foundedShortcut) {
      shortcut.key = foundedShortcut.key;
      shortcut.altKey = foundedShortcut.altKey ? foundedShortcut.altKey : false;
      shortcut.ctrlKey = foundedShortcut.ctrlKey ? foundedShortcut.ctrlKey : false;
      shortcut.shiftKey = foundedShortcut.shiftKey ? foundedShortcut.shiftKey : false;
      shortcut.preventDefault = foundedShortcut.preventDefault ? foundedShortcut.preventDefault : false;
    } else {
      shortcut.altKey = shortcut.altKey ? shortcut.altKey : false;
      shortcut.ctrlKey = shortcut.ctrlKey ? shortcut.ctrlKey : false;
      shortcut.shiftKey = shortcut.shiftKey ? shortcut.shiftKey : false;
      shortcut.preventDefault = shortcut.preventDefault ? shortcut.preventDefault : false;
    }

    this.shortcuts.push(shortcut);

    return shortcut;
  }

  remove(shortcutObj: NgShortcut) {
    this.shortcuts = this.shortcuts.filter(shortcut => shortcut !== shortcutObj);
  }

  fire(event: KeyboardEvent) {
    const foundedShortcut = this.findShortcut(event);

    if (foundedShortcut) {
      if (foundedShortcut.action instanceof ElementRef) {
        ( foundedShortcut.action as ElementRef).nativeElement.click();
      } else {
        foundedShortcut.action();
      }

      if (foundedShortcut.preventDefault) {
        event.preventDefault();
      }
    }
  }

  private findShortcut(event: KeyboardEvent): NgShortcut {
    const foundedShortcuts = this.shortcuts
      .filter(shortcut => shortcut.key === event.key &&
        shortcut.ctrlKey === event.ctrlKey &&
        shortcut.altKey === event.altKey &&
        shortcut.shiftKey === event.shiftKey);

    let max: NgShortcut = null;
    if (foundedShortcuts.length > 0) {
      max = foundedShortcuts.reduce((prev, current) => (prev.priority > current.priority) ? prev : current);
    }

    return max;
  }
}
