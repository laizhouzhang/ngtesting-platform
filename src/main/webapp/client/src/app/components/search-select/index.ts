import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule }  from '@angular/common';

import { SearchSelectComponent } from './src/search-select.component';

export * from './src/search-select.component';

@NgModule({
    declarations: [SearchSelectComponent],
    exports: [SearchSelectComponent],
    providers: [],
    imports: [CommonModule]
})
export class SearchSelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SearchSelectModule,
            providers: []
        };
    }
}
