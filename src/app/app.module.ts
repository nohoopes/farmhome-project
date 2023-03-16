import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { HistoryCardComponent } from './components/history-card/history-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddProductDialogComponent,
    HeaderComponent,
    SidebarComponent,
    ProductCardComponent,
    UpdateProductDialogComponent,
    OrderCardComponent,
    HistoryCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
