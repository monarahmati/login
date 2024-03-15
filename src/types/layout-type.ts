export interface SidenavShape {
  title: string;
  path?: string;
  icon: any;
  licenseName?: string;
  items?: SidenavShape[];
  permissionItems?: string[];
  element?: any;
}
