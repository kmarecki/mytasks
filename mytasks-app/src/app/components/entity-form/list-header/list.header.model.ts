export enum SortDirection{
    None = 0,
    Ascending = 1,
    Descending = 2
}
export class ListColumnModel {
    public name: string;
    public text: string;
    public gridWidth = 1;

    public isSortable: true;
    public sort = SortDirection.None;

    constructor(name: string, text?: string, gridWidth?: number, isSortable?: boolean) {
        this.name = name;
        this.text = text ? text : name;
        if(gridWidth) {
            this.gridWidth = gridWidth;
        }
        if(isSortable) {
            this.isSortable = isSortable;
        }
    }
}

export class ListHeaderModel {
    public columns: ListColumnModel[];
}