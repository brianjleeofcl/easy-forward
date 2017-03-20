import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginWrapperComponent } from './auth/login/login-wrapper.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DevicesComponent } from './main/devices/devices.component';

import { UsersService } from './users.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginWrapperComponent,
    SignUpComponent,
    NavComponent,
    GalleryComponent,
    DashboardComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: GalleryComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      }
    ])
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
