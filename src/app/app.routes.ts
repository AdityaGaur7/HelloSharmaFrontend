import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layouts/layout.component';
import { MainComponent } from './account/MainComp/main/main.component';
import { AstrologerDashboardComponent } from './account/AstrologerComp/astrologer-dashboard/astrologer-dashboard.component';
import { AuthGuard } from './account/guards/auth.guard';
import { AstrologerGuard } from './account/guards/astrologer.guard';

export const routes: Routes = [
  {
    path: 'dash',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./extrapages/extrapages.module').then((m) => m.ExtrapagesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
];
