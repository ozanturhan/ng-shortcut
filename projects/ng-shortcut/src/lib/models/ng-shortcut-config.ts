export interface NgShortcutConfig {
  id: string;
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  preventDefault?: boolean;
}
