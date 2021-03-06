import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputGroupComponent } from './input-group.component';
import { ThyInputSearchComponent } from './input-search.component';
import { FormsModule } from '@angular/forms';
import { ThyAutofocusDirective } from '../directive/thy-autofocus.directive';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyDirectiveModule
    ],
    declarations: [
        ThyInputDirective,
        ThyInputGroupComponent,
        ThyInputSearchComponent
    ],
    exports: [
        ThyInputDirective,
        ThyInputGroupComponent,
        ThyInputSearchComponent
    ]
})
export class ThyInputModule {

}
