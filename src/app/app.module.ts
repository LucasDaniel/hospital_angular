import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogarComponent } from './logar/logar.component';
import { LogarService } from './logar/logar.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { NovoCandidatoComponent } from './novo-candidato/novo-candidato.component';
import { EditarPlanoComponent } from './editar-plano/editar-plano.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    LogarComponent,
    PageNotFoundComponent,
    CandidatosComponent,
    NovoCandidatoComponent,
    EditarPlanoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgProgressModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [LogarService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
