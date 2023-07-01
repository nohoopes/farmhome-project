import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';

import { MatListModule } from '@angular/material/list';
import {} from '@angular/material/form-field';
import {} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';

import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { HistoryCardComponent } from './components/history-card/history-card.component';
import { ChattingComponent } from './pages/chatting/chatting.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgricuturalProductComponent } from './pages/agricutural-product/agricutural-product.component';
import { SuggestPriceComponent } from './pages/suggest-price/suggest-price.component';
import { OrderComponent } from './pages/order/order.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { PlacesTestComponent } from './components/places-test/places-test.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TokenInterceptor } from './interceptor/token-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddProductDialogComponent,
    HeaderComponent,
    SidebarComponent,
    ProductCardComponent,
    UpdateProductDialogComponent,
    OrderCardComponent,
    HistoryCardComponent,
    ChattingComponent,
    LoginComponent,
    RegisterComponent,
    AgricuturalProductComponent,
    SuggestPriceComponent,
    OrderComponent,
    HomeComponent,
    HistoryComponent,
    PlacesTestComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatDividerModule,
    FontAwesomeModule,
    HttpClientModule,
    MatExpansionModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTabsModule,
    MatStepperModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
