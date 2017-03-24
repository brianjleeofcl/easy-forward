import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DevicesComponent } from './main/devices/devices.component';
import { NewDeviceComponent } from './main/devices/new-device/new-device.component';
import { DeviceDetailsComponent } from './main/devices/device-details/device-details.component';
import { ProjectDetailsComponent } from './main/dashboard/project-details/project-details.component'; 

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent
  },
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'device/:id',
    component: DeviceDetailsComponent
  },
  {
    path: 'new-device',
    component: NewDeviceComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}