import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogarComponent } from './logar/logar.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { NovoCandidatoComponent } from './novo-candidato/novo-candidato.component';
import { EditarPlanoComponent } from './editar-plano/editar-plano.component';
import { Candidato } from './models/candidato';

const routes: Routes = [
  {
    path: 'logar',
    component: LogarComponent
  },
  {
    path: 'candidatos',
    component: CandidatosComponent
  },
  {
    path: 'novoCandidato',
    component: NovoCandidatoComponent
  },
  {
    path: 'editarPlano',
    component: EditarPlanoComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
