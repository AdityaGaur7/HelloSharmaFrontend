import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layouts/layout.component';
import { MainComponent } from './account/MainComp/main/main.component';
export const routes: Routes = [
    {
        path: "dash",
        component: LayoutComponent,
        loadChildren: () =>
            import("./pages/pages.module").then((m) => m.PagesModule)
    },
    {
        path: "pages",
        loadChildren: () =>
            import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
    },
    {
        path: "",
       
        loadChildren: () =>
            import("./account/account.module").then((m) => m.AccountModule),
    },
];
