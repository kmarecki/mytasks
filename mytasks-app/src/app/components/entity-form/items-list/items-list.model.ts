export enum SortDirection {
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

  public transform: (value: any) => string;

  constructor(
    name: string,
    text?: string,
    gridWidth?: number,
    isSortable?: boolean,
    transform?: (value: any) => string
  ) {
    this.name = name;
    this.text = text ? text : name;
    if (gridWidth) {
      this.gridWidth = gridWidth;
    }
    if (isSortable) {
      this.isSortable = isSortable;
    }
    this.transform = transform;
  }
}

export class ItemsListModel {
  public columns: ListColumnModel[];
  public items: any[];
}
