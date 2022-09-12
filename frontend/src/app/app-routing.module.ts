import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { FeedComponent } from './feed/feed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderVenderComponent } from './order-vender/order-vender.component';
import { PostSavedComponent } from './post-saved/post-saved.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ShowOrdersToUserComponent } from './show-orders-to-user/show-orders-to-user.component';
import { SignUpVenderComponent } from './sign-up-vender/sign-up-vender.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[AuthGuard] }, 
  { path: 'feed', component: FeedComponent,canActivate:[AuthGuard] }, 
  { path: 'savedPost', component: PostSavedComponent,canActivate:[AuthGuard] }, 
  { path: 'addToCart', component: AddToCartComponent,canActivate:[AuthGuard] }, 
  { path: 'showVenderOrders', component: OrderVenderComponent,canActivate:[AuthGuard] }, 
  { path: 'showVenderOrders/:id', component: OrderVenderComponent,canActivate:[AuthGuard] }, 
  
  { path: 'dish', component: AddDishComponent,canActivate:[AuthGuard] },  
  { path: 'showUserOrders', component: ShowOrdersToUserComponent,canActivate:[AuthGuard] },   

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signup-vender', component: SignUpVenderComponent },
  { path: 'reset-password', component: SetNewPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
