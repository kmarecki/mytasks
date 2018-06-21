import { ListHeaderComponent, SortEvent } from './list-header/list-header.component';
import * as _ from 'lodash';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  AfterViewInit,
  EventEmitter,
  QueryList,
  ViewChild,
  ViewChildren,
  Type,
  ViewContainerRef,
  AfterContentInit,
  AfterViewChecked
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';

import { Observable } from 'rxjs/Observable';

import { RestService } from '../../services/rest-service';
import { EditFormDirective } from './edit-form.directive';
import { ListItemDirective } from './list-item.directive';

import { EditFormComponent } from './edit-form.component';
import { ListItemComponent } from './list-item.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { ListHeaderDirective } from './list-header.directive';
import { SortDirection, ListColumnModel } from './list-header/list.header.model';

export abstract class EntityFormComponent<TEntity> implements OnInit, AfterViewInit {
  items: TEntity[];
  errorMessage: string;
  editor: EditFormComponent<TEntity> = { entity: undefined };
  buttonSortText: string;
  title: string;

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;
  @ViewChildren(ListItemDirective) listItem: QueryList<ListItemDirective>;

  constructor(
    private service: RestService<TEntity>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: BsModalService
  ) {}

  protected abstract getEditFormComponent(): Type<{}>;

  protected abstract getListItemComponent(): Type<{}>;

  protected abstract newEntity(): TEntity;

  protected abstract createEntityFromEditor(): any;

  protected abstract getId(entity: TEntity): number;

  protected abstract getColumns(): ListColumnModel[];

  protected abstract getTitle(): string;

  ngOnInit(): void {
    this.getItems();
    this.title = this.getTitle();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const editFormFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.getEditFormComponent()
      );
      const editFormContainerRef = this.editForm.viewContainerRef;
      this.editor = <EditFormComponent<TEntity>>(
        editFormContainerRef.createComponent(editFormFactory).instance
      );
    });

    this.listItem.changes.subscribe(() =>
      setTimeout(() => {
        this.refresh();
      })
    );
  }

  getItems(): void {
    this.service.getProjects().subscribe((projects) => {
      this.items = projects;
    }, (error) => (this.errorMessage = error));
  }

  create(): void {
    this.editor.entity = this.newEntity();
    this.onFocus.emit(true);
  }

  edit(entity: TEntity): void {
    this.editor.entity = _.clone(entity);
    this.onFocus.emit(true);
  }

  delete(entity: TEntity): void {
    const modal = <MessageBoxComponent>this.modalService.show(MessageBoxComponent).content;
    modal.message = 'Do you want to delete ?';
    modal.onClose.subscribe((result) => {
      if (result === true) {
        this.service.delete(this.getId(entity)).then(() => {
          this.getItems();
          if (this.editor.entity && this.getId(this.editor.entity) == this.getId(entity)) {
            this.editor.entity = undefined;
          }
        });
      }
    });
  }

  save(): void {
    const promise = this.getId(this.editor.entity)
      ? this.service.update(this.getId(this.editor.entity), this.editor.entity)
      : this.service.create(this.createEntityFromEditor());

    promise.then(() => {
      this.getItems();
      this.editor.entity = undefined;
    });
  }

  cancel(): void {
    this.editor.entity = undefined;
  }

  refresh(): void {
    const itemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.getListItemComponent()
    );
    const itemRefs = this.listItem.toArray();
    for (let i = 0; i < itemRefs.length; i++) {
      const itemRef = itemRefs[i].viewContainerRef;
      itemRef.clear();
      const itemComponent = <ComponentRef<ListItemComponent<TEntity>>>(
        itemRef.createComponent(itemComponentFactory)
      );
      itemComponent.changeDetectorRef.detectChanges();
      itemComponent.instance.item = itemRefs[i].item;
    }
  }

  private onSortItems(event: SortEvent): void {
    if (event.direction != SortDirection.None) {
      this.items = _.orderBy(this.items, [event.column], [event.direction === SortDirection.Ascending ? 'asc' : 'desc']);
    }
  }
}
