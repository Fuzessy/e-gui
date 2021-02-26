export interface Menu {
  id: number;
  label: string;
  submenu?: Array<Menu>;
  processCode: string;
  submenuHidden?: boolean;
}
