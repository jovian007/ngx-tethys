import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild, OnInit } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'thy-modal-footer',
    templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent implements OnInit {

    @ContentChild(TemplateRef)
    public footerTemplate: TemplateRef<any>;

    public isTemplateRef: boolean;

    public savingStatus?: boolean;

    public savingText = '确定...';

    @Input() thyLoadingText?: string;

    @Output() thyOnSave: EventEmitter<any> = new EventEmitter<any>();

    @Output() thyOnCancel: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    set thySaving(value: boolean) {
        this.savingStatus = value;
    }

    @Input()
    set thySavingText(value: string) {
        this.savingText = value;
    }

    constructor(
        private modalComponent: ModalComponent
    ) { }

    ngOnInit() {
        this.isTemplateRef = this.footerTemplate instanceof TemplateRef;
        this.modalComponent.hasFooter = true;
    }

    saveFn() {
        this.thyOnSave.emit();
    }

    cancelFn() {
        this.thyOnCancel.emit();
    }
}
