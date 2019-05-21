import { InjectionToken } from '@angular/core';
import { NgShortcutConfig } from '../models/ng-shortcut-config';
/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const NgShortcutConfigService = new InjectionToken<NgShortcutConfig>('NgShortcutConfig');

