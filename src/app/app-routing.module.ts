import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgricuturalProductComponent } from './pages/agricutural-product/agricutural-product.component';
import { ChattingComponent } from './pages/chatting/chatting.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SuggestPriceComponent } from './pages/suggest-price/suggest-price.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'chatting', component: ChattingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: AgricuturalProductComponent },
  { path: 'price', component: SuggestPriceComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
