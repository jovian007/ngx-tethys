import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxTethysModule } from '../../../src/index';
import { RouterModule } from '@angular/router';
import { SortablejsModule } from 'angular-sortablejs';

import { AppComponent } from './app.component';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { DOCS_COMPONENTS } from './docs/index';
import { appRoutes } from './app.routes';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThyTranslate } from '../../../src/shared';
import { DemoThyTranslate } from './demo-thy-translate';
import { FormsModule } from '@angular/forms';
import { ThyAvatarService } from '../../../src';
import { CustomAvatarService } from './components/+avatar/custom-avatar.service';
import { CustomEditorService } from './components/+editor/custom-editor.service';
import { ThyMarkdownParserService } from '../../../src/directive';

@NgModule({
    declarations: [
        AppComponent,
        ...COMPONENTS,
        ...DOCS_COMPONENTS
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],
    imports: [
        BrowserModule,
        NgxTethysModule,
        RouterModule.forRoot(appRoutes, {
            useHash: true
        }),
        ModalModule.forRoot(),
        TranslateModule.forRoot(),
        TabsModule.forRoot(),
        TranslateModule,
        SortablejsModule.forRoot({}),
        FormsModule
    ],
    providers: [
        {
            provide: ThyTranslate,
            useClass: DemoThyTranslate
        },
        {
            provide: ThyAvatarService,
            useClass: CustomAvatarService
        },
        {
            provide: ThyMarkdownParserService,
            useClass: CustomEditorService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private translate: TranslateService) {
        translate.use('zh-cn');
        translate.setTranslation('zh-cn', {
            common: {
                OK: '确定',
                CANCEL: '取消',
                DELETING: '删除中...',
                DELETE_CONFIRM: '确认删除',
                tips: {
                    'NO_RESULT': '没有数据',
                    'NO_RESULT_TARGET': '没有{{target}}'
                },
                confirm: {
                    CONTENT_DEFAULT: '确认删除这个吗？',
                    CONTENT: '确认删除项目 <code>{{name}}</code> 吗？'
                },
            },
            mission: {
                PROJECT: '项目',
                'TASK': '任务'
            }
        });
    }
}
