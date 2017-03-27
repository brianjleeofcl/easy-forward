import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

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
import { ProjectDetailsComponent } from './main/dashboard/project-details/project-details.component';
import { GalleryDetailsComponent } from './main/gallery/gallery-details/gallery-details.component';

import { UsersService } from './users.service';
import { DevicesService } from './devices.service';
import { ProjectsService } from './projects.service';
import { SocketService } from './socket.service';
import { GalleryService } from './gallery.service';

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
    DeviceDetailsComponent,
    ProjectDetailsComponent,
    GalleryDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule,
    NgbModule.forRoot()
  ],
  providers: [
    UsersService,
    SocketService,
    DevicesService,
    ProjectsService,
    GalleryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
