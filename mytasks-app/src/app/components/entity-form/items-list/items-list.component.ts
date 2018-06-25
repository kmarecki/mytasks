import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SortDirection, ListColumnModel, ItemsListModel } from './items-list.model';

export class SortEvent {
  column: string;
  direction: SortDirection;
}

export class EditEvent {
  item: any;
}

export class DeleteEvent {
  item: any;
}

@Component({
  selector: 'items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  public SortDirection = SortDirection;

  private model = new ItemsListModel();

  @Input() columns: ListColumnModel[];
  @Input() items: any[];
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() edit = new EventEmitter<EditEvent>();
  @Output() delete = new EventEmitter<DeleteEvent>();

  constructor() { }

  ngOnInit() {
    this.model.columns = this.columns;
    this.model.items = this.items;
  }

  renderItem(column: ListColumnModel, item: object): string {
    let text = item[column.name];
    if (column.transform) {
      text = column.transform(text);
    }
    return text;
  }
  onSort(name: string): void {
    let sortColumn: ListColumnModel;

    this.model.columns.forEach((column) => {
      if (column.name === name) {
        if (column.sort === SortDirection.None) {
          column.sort = SortDirection.Ascending;
        } else if (column.sort === SortDirection.Ascending) {
          column.sort = SortDirection.Descending;
        } else {
          column.sort = SortDirection.None;
        }
        sortColumn = column;
      } else {
        column.sort = SortDirection.None;
      }
    });

    if (sortColumn) {
      this.sort.emit({
        column: sortColumn.name,
        direction: sortColumn.sort
      });
    }
  }

  onEdit(item: any): void {
    this.edit.emit({
      item: item
    });
  }

  onDelete(item: any): void {
    this.delete.emit({
      item: item
    });
  }

}
