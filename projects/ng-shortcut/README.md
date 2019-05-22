# NgShortcut
See demo:
[demo](https://stackblitz.com/edit/ng-shortcut-demo)
  
# Install:
```npm install --save ng-shortcut```

# Usage:

### Basic:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeyboardShortcutsModule } from 'ng-shortcut';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        KeyboardShortcutsModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

````typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <button [ngShortcut]="'F1'" [preventDefault]="true" (click)="test()">Test</button>
    <ng-shortcut></ng-shortcut>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  test() {
    alert("Test");
  }
}
````

### Advanced:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeyboardShortcutsModule, NgShortcutConfig } from 'ng-shortcut';
import { AppComponent } from './app.component';

const shortcutConfig: NgShortcutConfig[] = [
  {
    id: '@save',
    key: 'F2',
    preventDefault: true
  },
    {
    id: '@cancel',
    key: 'F3',
    preventDefault: true
  }
]

@NgModule({
    declarations: [
    ],
    imports: [
        BrowserModule,
        KeyboardShortcutsModule.forRoot(shortcutConfig)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

````typescript
import { Component } from '@angular/core';
import { NgShortcutService, NgShortcut } from 'ng-shortcut';

@Component({
  selector: 'my-app',
  template: `
    <button [ngShortcut]="'@save'" (click)="save()">Save</button>
    <button [ngShortcut]="'@cancel'" (click)="cancel()">Cancel</button>
    <ng-shortcut></ng-shortcut>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private ngShortcutService: NgShortcutService) {
    ngShortcutService.push(new NgShortcut('F3', () => alert("F3 shortcut run"), {
      preventDefault: true,
      altKey: true
    }))
  }
    
  save() {
    alert("Save button fired");
  }
  cancel() {
    alert("Cancel button fired");
  }
}
````

# Directive
Directive that can be used for clickable elements, such as button etc...

| Name   |      Type      |  default         | description |
|----------|:-------------:|-----------------:  |:-------------:|
| ngShortcut |  ```string``` | [] | KeyboardEvent keys (F1, F2, A, B or user defined) |
| ctrlKey |    `boolean`  |   `undefined`   | KeyboardEvent ctrlKey |
| altKey |    `boolean`  |   `undefined`   | KeyboardEvent altKey |
| shiftKey |    `boolean`  |   `undefined`   | KeyboardEvent shiftKey |
| priority |    `boolean`  |   `0`   | Sorting shortcuts |
| preventDefault |    `boolean`  |   `undefined`   | KeyboardEvent preventDefault |

# Model And Interface
### NgShortcut
````typescript
export class NgShortcut {
  private _key: string;
  private _priority = 0;
  private _action: (() => void) | ElementRef;
  private _ctrlKey: boolean;
  private _altKey: boolean;
  private _shiftKey: boolean;
  private _preventDefault: boolean;

  constructor(
    key: string,
    action: (() => void) | ElementRef,
    options?: {
      priority?: number,
      ctrlKey?: boolean,
      altKey?: boolean,
      shiftKey?: boolean,
      preventDefault?: boolean,
    }
  ) {
    this._key = key;
    this._action = action;
    this._priority = options && options.priority ? options.priority : 0;
    if (options) {
      this._ctrlKey = options.ctrlKey;
      this._altKey = options.altKey;
      this._shiftKey = options.shiftKey;
      this._preventDefault = options.preventDefault;
    }

  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get priority(): number {
    return this._priority;
  }

  set priority(value: number) {
    this._priority = value;
  }

  get action(): (() => void) | ElementRef<any> {
    return this._action;
  }

  set action(value: (() => void) | ElementRef<any>) {
    this._action = value;
  }

  get ctrlKey(): boolean {
    return this._ctrlKey;
  }

  set ctrlKey(value: boolean) {
    this._ctrlKey = value;
  }

  get altKey(): boolean {
    return this._altKey;
  }

  set altKey(value: boolean) {
    this._altKey = value;
  }

  get shiftKey(): boolean {
    return this._shiftKey;
  }

  set shiftKey(value: boolean) {
    this._shiftKey = value;
  }

  get preventDefault(): boolean {
    return this._preventDefault;
  }

  set preventDefault(value: boolean) {
    this._preventDefault = value;
  }
}
````
### NgShortcutConfig
````typescript
export interface NgShortcutConfig {
  id: string;
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  preventDefault?: boolean;
}
````
# Service
Service can be define and remove global shortcuts. Reset config or update.

| Name   |      Type      |  params         | description |
|----------|:-------------:|-----------------:  |:-------------:|
| resetConfig |  ```void``` | `-` | Reset shortcut config |
| updateConfig |    `void`  |   `NgShortcutConfig[]`   | Update shortcut config |
| push |    `NgShortcut`  |   `NgShortcut`   | Define and push global shortcuts |
| remove |    `void`  |   `-`   | Remove defined shortcut |
| fire |    `void`  |   `KeyboardEvent`   | Find and call active shortcut action |

# License
This project is licensed under the MIT License:

Copyright 2019, Mehmet Ozan Turhan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
