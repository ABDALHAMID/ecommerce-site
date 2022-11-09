import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroSocialComponent } from './template/hero-social/hero-social.component';
import { HeaderComponent } from './template/header/header.component';
import { SliderComponent } from './template/slider/slider.component';
import { AboutComponent } from './template/about/about.component';
import { ContactComponent } from './template/contact/contact.component';
import { FooterComponent } from './template/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SingelProductComponent } from './pages/singel-product/singel-product.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './template/breadcrumb/breadcrumb.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { CategoriesComponent } from './template/categories/categories.component';
import { CategoryComponent } from './pages/category/category.component';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroSocialComponent,
    HeaderComponent,
    SliderComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    SingelProductComponent,
    BreadcrumbComponent,
    UserRegisterComponent,
    CategoriesComponent,
    CategoryComponent,
    BackofficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
