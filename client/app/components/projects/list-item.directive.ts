import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[list-item]'
})
export class ListItemDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}