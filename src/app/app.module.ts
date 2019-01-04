import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TestslistComponent } from './testslist/testslist.component';
import { PoollistComponent } from './poollist/poollist.component';
import { ProfileComponent } from './profile/profile.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TestdetailsComponent, TestReportDialog } from './testdetails/testdetails.component';
import { TestcreateComponent } from './testcreate/testcreate.component';
import { TaketestComponent } from './taketest/taketest.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TesteditComponent } from './testedit/testedit.component';
import { ActivationComponent } from './activation/activation.component';
import { ActivateComponent } from './activate/activate.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TestslistComponent,
    PoollistComponent,
    ProfileComponent,
    NavigationComponent,
    TestdetailsComponent,
    TestcreateComponent,
    TaketestComponent,
    SettingsComponent,
    AdminToolsComponent,
    TestReportDialog,
    TesteditComponent,
    ActivationComponent,
    ActivateComponent
  ],
  entryComponents:[
    TestReportDialog
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
