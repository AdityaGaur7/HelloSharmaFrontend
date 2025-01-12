import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './MainComp/main/main.component';
import { HomeComponent } from './MainComp/home/home.component';
import { BookpoojaComponent } from './Pages/bookpooja/bookpooja.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { AstromallComponent } from './Pages/astromall/astromall.component';
import { ChatastroComponent } from './Pages/chatastro/chatastro.component';
import { ErrorComponent } from './Comp/error/error.component';
import { AdminComponent } from './AdminComp/admin/admin.component';
import { LoginComponent } from './AuthComp/login/login.component';
import { SignupComponent } from './AuthComp/signup/signup.component';
import { ChatComponent } from './Comp/chat/chat.component';
import { ChatcompComponent } from './Pages/chat-comp/chat-comp.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { OrderHistoryComponent } from './Pages/order-history/order-history.component';
import { WalletComponent } from './Pages/wallet/wallet.component';
import { AdminGuard } from './guards/admin.guard';
import { AstrologerDashboardComponent } from './AstrologerComp/astrologer-dashboard/astrologer-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AstrologerGuard } from './guards/astrologer.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'main', component: MainComponent, title: 'Main' },
  { path: 'bookpooja', component: BookpoojaComponent, title: 'BookPooja' },
  { path: 'chatcomp', component: ChatcompComponent, title: 'BookPooja' },
  { path: 'astromall', component: AstromallComponent, title: 'AstrolMall' },
  { path: 'chatastro', component: ChatastroComponent, title: 'Chatastro' },
  { path: 'login', component: LoginComponent, title: 'Chatastro' },
  { path: 'signup', component: SignupComponent, title: 'Chatastro' },
  { path: 'chat', component: ChatComponent, title: 'chater' },
  { path: 'blog', component: BlogComponent, title: 'Blog' },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [AdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'profile', component: ProfileComponent, title: 'Profile' },
  { path: 'orders', component: OrderHistoryComponent, title: 'Order History' },
  { path: 'wallet', component: WalletComponent, title: 'Wallet' },
  {
    path: 'astrologer-dashboard',
    component: AstrologerDashboardComponent,
    title: 'Astrologer Dashboard',
    canActivate: [AuthGuard, AstrologerGuard],
  },
  { path: '**', component: ErrorComponent, title: 'Page not found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
