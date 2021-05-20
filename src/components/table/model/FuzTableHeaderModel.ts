export default interface FuzTableHeaderModel {
  label: string;
  columnName: string;
  searchField?: SearchFieldModel;
  align?: string;
  sortable?: boolean;
}

interface SearchFieldModel {
  type: string;
  defaultSearch?: boolean;
}
