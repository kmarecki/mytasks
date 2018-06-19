import * as _ from 'lodash';
import {
  Component, ComponentFactoryResolver, ComponentRef, OnInit, AfterViewInit, EventEmitter,
  QueryList, ViewChild, ViewChildren, Type, ViewContainerRef, AfterContentInit, AfterViewChecked
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


export abstract class EntityFormComponent<TEntity> implements OnInit, AfterViewInit {

  items: TEntity[];
  errorMessage: string;
  editor: EditFormComponent<TEntity> = { entity: undefined };
  buttonSortText: string;
  title: string;

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;
  @ViewChild(ListHeaderDirective) listHeader: ListHeaderDirective;
  @ViewChildren(ListItemDirective) listItem: QueryList<ListItemDirective>;


  constructor(
    private service: RestService<TEntity>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: BsModalService) { }

  protected abstract getEditFormComponent(): Type<{}>;

  protected abstract getListHeaderComponent(): Type<{}>;

  protected abstract getListItemComponent(): Type<{}>;

  protected abstract newEntity(): TEntity;

  protected abstract createEntityFromEditor(): any;

  protected abstract getId(entity: TEntity): number;

  protected abstract getNameProperty(): string;

  protected abstract getTitle(): string;

  ngOnInit(): void {
    this.getItems();
    this.title = this.getTitle();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const listHeaderFactory = this.componentFactoryResolver.resolveComponentFactory(this.getListHeaderComponent());
      const listHeaderContainerRef = this.listHeader.viewContainerRef;
      listHeaderContainerRef.createComponent(listHeaderFactory);

      const editFormFactory = this.componentFactoryResolver.resolveComponentFactory(this.getEditFormComponent());
      const editFormContainerRef = this.editForm.viewContainerRef;
      this.editor = <EditFormComponent<TEntity>>editFormContainerRef.createComponent(editFormFactory).instance;
    });

    this.listItem.changes
      .subscribe(() =>
        setTimeout(() => {
          this.refresh();
        }));
  }

  getItems(): void {
    this.service.getProjects()
      .subscribe(
        projects => {
          this.items = projects;
          this.sortItems()
        },
        error => this.errorMessage = error);
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
    const modal = (<MessageBoxComponent>this.modalService.show(MessageBoxComponent).content);
    modal.message = "Do you want to delete ?";
    modal.onClose.subscribe(result => {

      if (result === true) {
        this.service.delete(this.getId(entity))
          .then(() => {
            this.getItems();
            if (this.editor.entity && this.getId(this.editor.entity) == this.getId(entity)) {
              this.editor.entity = undefined;
            }
          });
      }
    })
  }

  save(): void {
    const promise = this.getId(this.editor.entity) ?
      this.service.update(this.getId(this.editor.entity), this.editor.entity) :
      this.service.create(this.createEntityFromEditor());

    promise
      .then(() => {
        this.getItems();
        this.editor.entity = undefined;
      });
  }

  cancel(): void {
    this.editor.entity = undefined;
  }

  refresh(): void {

    const itemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getListItemComponent())
    const itemRefs = this.listItem.toArray();
    for (let i = 0; i < itemRefs.length; i++) {
      const itemRef = itemRefs[i].viewContainerRef;
      itemRef.clear();
      const itemComponent = <ComponentRef<ListItemComponent<TEntity>>>itemRef.createComponent(itemComponentFactory);
      itemComponent.changeDetectorRef.detectChanges();
      itemComponent.instance.item = itemRefs[i].item;
    }
  }

  private ascending = true;
  private sortItems(): void {
    this.items = _.orderBy(this.items, [this.getNameProperty()], [this.ascending ? 'asc' : 'desc']);
    this.buttonSortText = this.ascending ? 'Sort asc' : 'Sort desc';
  }

  sort(): void {
    this.ascending = !this.ascending;
    this.sortItems();
  }

}
