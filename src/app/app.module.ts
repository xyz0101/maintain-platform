import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { EvalMaintainComponent } from './eval-maintain/eval-maintain.component';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import {NgxLoadingModule} from 'ngx-loading';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData, HashLocationStrategy } from '@angular/common';
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
import { InterceptorServiceService } from 'src/app/interceptor-service.service';
import { TargetMaintainComponent } from './target/target-maintain/target-maintain.component';
import { LocationStrategy } from '@angular/common';
import { TargetSelfDateMaintainComponent } from './target/target-self-date-maintain/target-self-date-maintain.component';
import { TargetSelfTodoComponent } from './target/target-self-todo/target-self-todo.component';



import { SalaryMaintainComponent } from './salary/salary-maintain/salary-maintain.component';
import { SalarySpecialConfigComponent } from './salary/salary-special-config/salary-special-config.component';
import { SalaryHolidayConfigComponent } from './salary/salary-holiday-config/salary-holiday-config.component';
import { NoAuthPageComponent } from './no-auth-page/no-auth-page.component';
import { EvalServiceService } from 'src/app/eval-service/eval-service.service';
import { TargetService } from 'src/app/target-service/target.service';
    
registerLocaleData(zh);

registerLocaleData(en);
 const routerConfig:Routes=[
  {path:'home',component:EvalMaintainComponent,canActivate:[RouterGuard]},
  {path:'eval/first/:curPage',component:EvalMaintainComponent,canActivate:[RouterGuard]},
  {path:'target/selfdate',component:TargetSelfDateMaintainComponent,canActivate:[RouterGuard]},
   {path:'target/selfTodo',component:TargetSelfTodoComponent,canActivate:[RouterGuard]},
  {path:'eval/ready',component:EvalDataReadyComponent,canActivate:[RouterGuard],children:[
    {path:'',component:ReadyStepOneComponent ,canDeactivate:[RouterGuard],canActivate:[RouterGuard] },
    {path:'stepsecond',component:ReadyStepSecondComponent ,canDeactivate:[RouterGuard] ,canActivate:[RouterGuard]},
    {path:'stepthird',component:ReadyStepThirdComponent ,canDeactivate:[RouterGuard],canActivate:[RouterGuard] },
    {path:'stepfourth',component:ReadyStepFourthComponent ,canDeactivate:[RouterGuard] ,canActivate:[RouterGuard]},
    {path:'stepfifth',component:ReadyStepFifthComponent ,canDeactivate:[RouterGuard] ,canActivate:[RouterGuard]}
  ], canDeactivate: [RouterGuard]},
  {path:'salary/special',component:SalarySpecialConfigComponent,canActivate:[RouterGuard]},
  {path:'salary/holiday',component:SalaryHolidayConfigComponent,canActivate:[RouterGuard]},
  {path:'noauth',component:NoAuthPageComponent,canActivate:[RouterGuard]}
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
    ReadyStepFifthComponent,
    TargetMaintainComponent,
    TargetSelfDateMaintainComponent,
    TargetSelfTodoComponent,

    SalaryMaintainComponent,
    SalarySpecialConfigComponent,
    SalaryHolidayConfigComponent,
    NoAuthPageComponent ,



    SalaryMaintainComponent 


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
    RouterModule.forRoot(routerConfig,{useHash: true, onSameUrlNavigation: 'reload'}),
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, RouterGuard,  {provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true}, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },EvalServiceService,TargetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
