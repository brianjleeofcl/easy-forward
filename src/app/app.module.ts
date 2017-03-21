import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { LoginWrapperComponent } from './auth/login/login-wrapper.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NavComponent } from './nav/nav.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DevicesComponent } from './main/devices/devices.component';
import { NewDeviceComponent } from './main/devices/new-device/new-device.component';
import { DeviceDetailsComponent } from './main/devices/device-details/device-details.component';

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
    DevicesComponent,
    NewDeviceComponent,
    DeviceDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
