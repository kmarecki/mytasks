import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SortDirection, ListColumnModel, ListHeaderModel } from './list.header.model';

export class SortEvent {
  column:string; 
  direction: SortDirection;
}

@Component({
  selector: 'list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css']
})
export class ListHeaderComponent implements OnInit {

  @Input() columns: ListColumnModel[];
  @Output() sort = new EventEmitter<SortEvent>();

  private model = new ListHeaderModel();
  constructor() {

  }

  ngOnInit() {
    this.model.columns = this.columns;
  }

}
 