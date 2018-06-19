import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[list-header]'
})
export class ListHeaderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}