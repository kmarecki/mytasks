import { Directive, ViewContainerRef, Input } from "@angular/core";

@Directive({
    selector: '[list-item]'
})
export class ListItemDirective {

    @Input() item: object;

    constructor(public viewContainerRef: ViewContainerRef) {}
}