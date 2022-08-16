import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TranslatorComponent } from './shared/translator/translator.component';
import { TranslatorWindowComponent } from './shared/translator-window/translator-window.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { LanguageChooseComponent } from './shared/language-choose/language-choose.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageURLPipe } from './pipes/language-choose.pipe';
import { CommonModule } from "@angular/common";
import { NotificationComponent } from './shared/notification/notification.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    TranslatorComponent,
    TranslatorWindowComponent,
    LanguageChooseComponent,
    LanguageURLPipe,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
