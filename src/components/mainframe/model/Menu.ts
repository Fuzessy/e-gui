export interface Menu {
  id: number;
  label: string;
  submenu?: Array<Menu>;
  routeEvent?: string;
  submenuHidden?: boolean;
}
