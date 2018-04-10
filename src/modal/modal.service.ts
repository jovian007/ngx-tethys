import { Injectable, TemplateRef, RendererFactory2, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader/index';
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
    private bsModalRef: BsModalRef;

    constructor(
        private modalService: BsModalService,
        rendererFactory: RendererFactory2,
        clf: ComponentLoaderFactory) {
        super(rendererFactory, clf);
    }

    show(content: string | TemplateRef<any> | any, config?: ThyModalConfigInfo): BsModalRef {
        this.bsModalRef = new BsModalRef();
        this.createLoaders();
        this.setModalConfig(config);
        this.bsModalRef = this.modalService.show(content, this.modalConfig);
        return this.bsModalRef;
    }

    close() {
        // this.modalService.hide(this.modalService.getModalsCount());
        this.bsModalRef.hide();
    }

    private setModalConfig(config: ThyModalConfigInfo) {
        this.modalConfig = Object.assign({}, modalConfigDefaults, config);
        if (config && config.size) {
            this.modalConfig.class = `modal-${config.size}`;
        }
    }

    private createLoaders(): void {
        this.modalService.onShow = this.onShow;
        this.modalService.onShown = this.onShown;
        this.modalService.onHide = this.onHide;
        this.modalService.onHidden = this.onHidden;
    }
}


export class ThyModalConfigInfo {
    size?: string;
    backdrop?: string | boolean; // true || false || 'static'
    keyboard?: boolean;
    animated?: boolean;
    ignoreBackdropClick?: boolean;
    initialState?: object;
    show?: boolean;  // Shows the modal when initialized.
}
