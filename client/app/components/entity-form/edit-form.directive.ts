import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[edit-form]'
})
export class EditFormDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}