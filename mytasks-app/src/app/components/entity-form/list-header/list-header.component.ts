import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SortDirection, ListColumnModel, ListHeaderModel } from './list.header.model';

export class SortEvent {
  column: string;
  direction: SortDirection;
}

@Component({
  selector: 'list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {
  //pass enum to template
  public SortDirection = SortDirection;

  @Input() columns: ListColumnModel[];
  @Output() sort = new EventEmitter<SortEvent>();

  private model = new ListHeaderModel();
  constructor() {}

  ngOnInit() {
    this.model.columns = this.columns;
  }

  onColumnClick(name: string): void {
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
}
