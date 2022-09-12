import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatBadgeModule} from '@angular/material/badge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './common/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {NgxMatIntlTelInputModule} from "ngx-mat-intl-tel-input";
import { MatCarouselModule } from 'ng-mat-carousel';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { CommonModule } from '@angular/common';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SwiperModule } from "swiper/angular";
import { PostSavedComponent } from './post-saved/post-saved.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ViewCommentComponent } from './view-comment/view-comment.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { 
	IgxCarouselModule,
	IgxSliderModule
 } from "igniteui-angular";
import { ViewlikeComponent } from './viewlike/viewlike.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeedComponent } from './feed/feed.component';
// import { AddDishComponent } from './add-dish/add-dish.component';
import {MatTableModule} from '@angular/material/table';
import { AddDishComponent } from './add-dish/add-dish.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { AddAddressComponent } from './add-address/add-address.component';
import { ShowOrdersToUserComponent } from './show-orders-to-user/show-orders-to-user.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ViewDishComponent } from './view-dish/view-dish.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { SignUpVenderComponent } from './sign-up-vender/sign-up-vender.component';
import { OrderVenderComponent } from './order-vender/order-vender.component';
import { NgChartsModule } from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
  
    AppComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,   
   
      AddNewPostComponent,
      PostSavedComponent,
      ChangePasswordComponent,
      ViewCommentComponent,
      ViewlikeComponent,
      SetNewPasswordComponent,
      ForgotPasswordComponent,
      VerifyEmailComponent,
      FeedComponent,
      AddDishComponent,
      AddToCartComponent,
      ViewDishComponent,
      AddAddressComponent,
      ShowOrdersToUserComponent,
      AddDishFormComponent,
      SignUpVenderComponent,
      OrderVenderComponent,
      // AddDishComponent,
      
  
    ],
  
  imports: [
    MatSelectModule,
    BrowserModule,
    MatBadgeModule,
    MatSlideToggleModule,
    NgChartsModule,
    MatButtonToggleModule,
    SocialLoginModule,
    MatTooltipModule,
    PickerModule,
  
    MatGridListModule,
    NgxIntlTelInputModule,
    MatProgressBarModule,
    MatTableModule,
    NgxEmojiPickerModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule,
    AvatarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    MatGridListModule,
    
    SwiperModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxMatIntlTelInputModule,
    CommonModule, FormsModule, 
    FormsModule,
    MatCarouselModule.forRoot(),
    IgxCarouselModule,
	IgxSliderModule,
  
  BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot(),
    IvyCarouselModule,
    GooglePlaceModule,
    InfiniteScrollModule,
    MatPaginatorModule,
    MatSortModule,
  
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1029695319621-fjbe1t812mm8le9ehmc8g024sp9l160m.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
    {
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorInterceptor,
    multi:true
  },
  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
