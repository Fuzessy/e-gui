export default interface EwTableHeaderModel{
    label: string;
    columnName: string;
    searchField? : SearchFieldModel;
    align?: string;
    sortable?: boolean;
}

interface SearchFieldModel {
    type: string;
}
