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
const routes: Routes = [
  
  { path: '', component: HomeComponent, title: "Home"},
  // { path: 'main', component: MainComponent, title: "Main" },
  { path: 'bookpooja', component: BookpoojaComponent, title: "BookPooja" },
  { path: 'astromall', component: AstromallComponent, title: "AstrolMall" },
  { path: 'chatastro', component: ChatastroComponent, title: "Chatastro" },
  { path: 'login', component: LoginComponent, title: "Chatastro" },
  { path: 'signup', component: SignupComponent, title: "Chatastro" },
  {path:'chat',component:ChatComponent,title:"chater"},
  { path: 'blog', component: BlogComponent, title: "Blog" },
  { path: 'admin', component: AdminComponent, title: "Admin" },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: ErrorComponent, title: "Page not found" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
