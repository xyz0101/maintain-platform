import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { EvalMaintainComponent } from './eval-maintain/eval-maintain.component';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';
import { HttpModule,JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {NgxLoadingModule} from 'ngx-loading';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatCheckboxModule } from "@angular/material";
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import zh from '@angular/common/locales/zh';
import { EvalDataReadyComponent } from './eval-data-ready/eval-data-ready.component';
import { ReadyStepSecondComponent } from './eval-data-ready-sub/ready-step-second/ready-step-second.component';
import { ReadyStepOneComponent } from './eval-data-ready-sub/ready-step-one/ready-step-one.component';
import { ReadyStepThirdComponent } from './eval-data-ready-sub/ready-step-third/ready-step-third.component';
import { RouterGuard } from 'src/app/guard/RouterGuard';
import { ReadyStepFourthComponent } from './eval-data-ready-sub/ready-step-fourth/ready-step-fourth.component';
import { ReadyStepFifthComponent } from './eval-data-ready-sub/ready-step-fifth/ready-step-fifth.component';
    
registerLocaleData(en);
 const routerConfig:Routes=[
  {path:'home',component:EvalMaintainComponent},
  {path:'evaluate/first/:curPage',component:EvalMaintainComponent},
  {path:'evaluate/ready',component:EvalDataReadyComponent,children:[
    {path:'',component:ReadyStepOneComponent ,canDeactivate:[RouterGuard] },
    {path:'stepsecond',component:ReadyStepSecondComponent ,canDeactivate:[RouterGuard] },
    {path:'stepthird',component:ReadyStepThirdComponent ,canDeactivate:[RouterGuard] },
    {path:'stepfourth',component:ReadyStepFourthComponent ,canDeactivate:[RouterGuard] },
    {path:'stepfifth',component:ReadyStepFifthComponent ,canDeactivate:[RouterGuard] }
    
    
  ],canDeactivate:[RouterGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ContentComponent,
    EvalMaintainComponent,
    EvalDataReadyComponent,
    ReadyStepSecondComponent,
    ReadyStepOneComponent,
    ReadyStepThirdComponent,
    ReadyStepFourthComponent,
    ReadyStepFifthComponent 
   ],
  imports: [
    BrowserModule,
     AppRoutingModule,
    NgxLoadingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule ,
    JsonpModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule ,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserModule,
    RouterModule.forRoot(routerConfig,{ onSameUrlNavigation: 'reload'}),
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN },RouterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
