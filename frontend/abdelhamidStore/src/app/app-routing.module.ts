import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { SingelProductComponent } from './pages/singel-product/singel-product.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { BreadcrumbComponent } from './template/breadcrumb/breadcrumb.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'product/:id',component:SingelProductComponent},
  {path:'breadCrumb',component:BreadcrumbComponent},
  {path:'userRegister',component:UserRegisterComponent},
  {path:'category/:id',component:CategoryComponent},
  {path:'backOffice',component:BackofficeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
