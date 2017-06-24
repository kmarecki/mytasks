import * as _ from 'lodash';
import {
  Component, ComponentFactoryResolver, ComponentRef, OnInit, AfterViewInit, EventEmitter,
  QueryList, ViewChild, ViewChildren, Type, ViewContainerRef, AfterContentInit, AfterViewChecked
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Project } from '../../services/projects/project';
import { ProjectsService } from '../../services/projects/projects.service';
import { RestService } from '../../services/rest-service';
import { EditFormDirective } from './edit-form.directive';
import { ListItemDirective } from './list-item.directive';

import { EditFormComponent } from './edit-form.component';
import { ListItemComponent } from './list-item.component';
import { ProjectItemComponent } from './project-item.component';

export interface EntityFormComponentImpl<TEntity> {

  getÈditFormComponent(): Type<{}>;

  getListItemComponent(): Type<{}>;

  newEntity(): TEntity;

  createEntityFromEditor(): any;

  getId(entity: TEntity): number;
}

// @Component({
//   template: ''
// })
export class EntityFormComponent<TEntity> implements OnInit, AfterViewInit {

  items: TEntity[];
  errorMessage: string;
  editor: EditFormComponent<TEntity> = { entity: undefined };
  buttonSortText: string;

  onFocus = new EventEmitter<boolean>();

  @ViewChild(EditFormDirective) editForm: EditFormDirective;
  @ViewChildren(ListItemDirective) listItem: QueryList<ListItemDirective>;


  constructor(
    private service: RestService<TEntity>,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  private getImpl(): EntityFormComponentImpl<TEntity> {
    return <EntityFormComponentImpl<TEntity>>(<any>this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getImpl().getÈditFormComponent());
      let viewContainerRef = this.editForm.viewContainerRef;
      this.editor = <EditFormComponent<TEntity>>viewContainerRef.createComponent(componentFactory).instance;
    });

    this.listItem.changes
      .subscribe(() =>
        setTimeout(() => {
          this.refresh();
        }));
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.service.getProjects()
      .subscribe(
      projects => {
        this.items = projects;
        this.sort()
      },
      error => this.errorMessage = error);
  }

  create(): void {
    this.editor.entity = this.getImpl().newEntity();
    this.onFocus.emit(true);
  }

  edit(entity: TEntity): void {
    this.editor.entity = _.clone(entity);
    this.onFocus.emit(true);
  }

  delete(entity: TEntity): void {
    this.service.delete(this.getImpl().getId(entity))
      .then(() => {
        this.getItems();
        if (this.getImpl().getId(this.editor.entity) == this.getImpl().getId(entity)) {
          this.editor.entity = undefined;
        }
      });
  }

  save(): void {
    const promise = this.getImpl().getId(this.editor.entity) ?
      this.service.update(this.getImpl().getId(this.editor.entity), this.editor.entity) :
      this.service.create(this.getImpl().createEntityFromEditor());

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

    let itemComponentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getImpl().getListItemComponent())
    let itemRefs = this.listItem.toArray();
    for (let i = 0; i < itemRefs.length; i++) {
      let itemRef = itemRefs[i].viewContainerRef;
      itemRef.clear();
      let itemComponent = <ComponentRef<ListItemComponent<TEntity>>>itemRef.createComponent(itemComponentFactory);
      itemComponent.changeDetectorRef.detectChanges();
      itemComponent.instance.item = itemRefs[i].item;
    }
  }

  private ascending = true;
  sort(): void {
    this.items = _.orderBy(this.items, ['projectName'], [this.ascending ? 'asc' : 'desc']);
    this.buttonSortText = this.ascending ? 'Sort asc' : 'Sort desc';
    this.ascending = !this.ascending;
  }

}
