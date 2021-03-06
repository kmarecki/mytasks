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

import { EditFormComponent } from './edit-form.component';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { SortEvent, EditEvent, DeleteEvent } from './items-list/items-list.component';
import { ListColumnModel, SortDirection } from './items-list/items-list.model';

export abstract class EntityFormComponent<TEntity, TService extends RestService<TEntity>>
  implements OnInit, AfterViewInit {
  items: TEntity[];
  errorMessage: string;
  editor: EditFormComponent<TEntity> = { entity: undefined };
  buttonSortText: string;
  title: string;
  lastSortEvent: SortEvent;

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;

  constructor(
    protected service: TService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected modalService: BsModalService
  ) {}

  protected abstract getEditFormComponent(): Type<{}>;

  protected abstract newEntity(): TEntity;

  protected abstract getId(entity: TEntity): number;

  protected abstract getColumns(): ListColumnModel[];

  protected abstract getTitle(): string;

  protected getAll(): Observable<any> {
    return this, this.service.getAll();
  }

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

  }

  getItems(): void {
    this.getAll().subscribe((items) => {
      this.items = items;
      this.sortItems();
    }, (error) => (this.errorMessage = error));
  }

  create(): void {
    this.editor.entity = this.newEntity();
    this.onFocus.emit(true);
  }

  edit(entity: TEntity): void {
    this.service.get(this.getId(entity)).then((entity) => {
      this.editor.entity = <TEntity>entity;
      this.onFocus.emit(true);
    });
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
      : this.service.create(this.editor.entity);

    promise.then(() => {
      this.getItems();
      this.editor.entity = undefined;
    });
  }

  cancel(): void {
    this.editor.entity = undefined;
  }

  refresh(): void {
    this.getItems();
  }

  private onSort(event: SortEvent): void {
    this.lastSortEvent = event;
    this.sortItems();
  }

  private sortItems(): void {
    if (this.lastSortEvent) {
      const event = this.lastSortEvent;
      if (event.direction != SortDirection.None) {
        this.items = _.orderBy(
          this.items,
          [event.column],
          [event.direction === SortDirection.Ascending ? 'asc' : 'desc']
        );
      }
    }
  }

  private onEdit(event: EditEvent): void {
    this.edit(event.item);
  }

  private onDelete(event: DeleteEvent): void {
    this.delete(event.item);
  }
}
