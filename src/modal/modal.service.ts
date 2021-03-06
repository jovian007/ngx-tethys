import { Injectable, TemplateRef, RendererFactory2, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import {
    modalConfigDefaults,
    ModalOptions
} from 'ngx-bootstrap/modal/modal-options.class';

@Injectable()
export class ThyModalService extends BsModalService {

    onShow: EventEmitter<any> = new EventEmitter();
    onShown: EventEmitter<any> = new EventEmitter();
    onHide: EventEmitter<any> = new EventEmitter();
    onHidden: EventEmitter<any> = new EventEmitter();

    private modalConfig: ModalOptions;
    private bsModalRefs: BsModalRef[] = [];

    constructor(
        private modalService: BsModalService,
        rendererFactory: RendererFactory2,
        clf: ComponentLoaderFactory) {
        super(rendererFactory, clf);
        this.modalService.onHidden.subscribe(() => {
            if (this.bsModalRefs.length > 0) {
                this.bsModalRefs.splice(this.bsModalRefs.length - 1, 1);
            }
        });
    }

    show(content: string | TemplateRef<any> | any, config?: ThyModalConfigInfo): BsModalRef {
        this.setModalConfig(config);
        const bsModalRef = this.modalService.show(content, this.modalConfig);
        this.bsModalRefs.push(bsModalRef);
        return bsModalRef;
    }

    close() {
        if (this.bsModalRefs.length > 0) {
            this.bsModalRefs[this.bsModalRefs.length - 1].hide();
        }
    }

    private setModalConfig(config: ThyModalConfigInfo) {
        this.modalConfig = Object.assign({}, modalConfigDefaults, config);
        if (config && config.size) {
            this.modalConfig.class = `modal-${config.size}`;
        }
    }
}


export class ThyModalConfigInfo {
    size?: string; // 默认md大小，'blg','lg','mg','sm'
    backdrop?: string | boolean; // true || false || 'static'
    keyboard?: boolean;
    animated?: boolean;
    ignoreBackdropClick?: boolean;
    initialState?: object;
    show?: boolean;  // Shows the modal when initialized.
}
