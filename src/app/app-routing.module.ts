import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgricuturalProductComponent } from './pages/agricutural-product/agricutural-product.component';
import { ChattingComponent } from './pages/chatting/chatting.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SuggestPriceComponent } from './pages/suggest-price/suggest-price.component';
import { OrderComponent } from './pages/order/order.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chatting', component: ChattingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', component: AgricuturalProductComponent },
  { path: 'price', component: SuggestPriceComponent },
  { path: 'order', component: OrderComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
