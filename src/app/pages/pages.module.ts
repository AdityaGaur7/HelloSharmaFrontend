import { NgModule } from '@angular/core';
import { DashboardsModule } from './dashboards/dashboards.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UtilityModule } from './utility/utility.module';
@NgModule(
        {
                declarations: [],
                imports: [DashboardsModule,UtilityModule],
                providers: [provideHttpClient(withInterceptorsFromDi())]
        })
export class PagesModule { }
