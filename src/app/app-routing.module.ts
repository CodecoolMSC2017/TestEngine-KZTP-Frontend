import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TestslistComponent } from './testslist/testslist.component';
import { PoollistComponent } from './poollist/poollist.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuard } from './login.guard';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { TestcreateComponent } from './testcreate/testcreate.component';
import { TaketestComponent } from './taketest/taketest.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'tests',component: TestslistComponent},
  {path: 'pool',component: PoollistComponent,canActivate: [LoginGuard]},
  {path: 'user/:id', component: ProfileComponent, canActivate: [LoginGuard]},
  {path: 'test/:id', component: TestdetailsComponent, canActivate: [LoginGuard]},
  {path: 'newtest', component: TestcreateComponent, canActivate: [LoginGuard]},
  {path: 'test/take/:id', component: TaketestComponent, canActivate: [LoginGuard]},
  {path: 'mysettings', component: SettingsComponent, canActivate: [LoginGuard]},
  {path: 'admintools', component: AdminToolsComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: '/home' ,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
