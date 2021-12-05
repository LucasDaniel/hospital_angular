import { Component, OnInit } from '@angular/core';
import { CandidatosService } from './candidatos.service';
import { Router } from '@angular/router';
import { Candidato } from '../models/candidato';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface testeinterface {
  name: string,
  age: number
}

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {

  readonly snackBarDuration = 4000; 
  dataSource;
  displayedColumns: string[] = ['nome', 'idade', 'cpf', 'endereco', 'planoNome', 'valor', 'validar'];
  candidatos: Array<Candidato>;
  permissao = JSON.parse(localStorage.getItem('permissao'));

  constructor(private candidatosService: CandidatosService, private router: Router,
    private snackbar: MatSnackBar) { }

  /**
   * Inicia a tela de candidatos mostrando-os em uma lista
   *   sendo possivel rejeitar, aceitar e editar um candidato que foi reprovado
   * @return void
   */
  ngOnInit(): void {
    this.candidatos = new Array<Candidato>();
    this.candidatosService.selecionarCandidatos().subscribe(res => {
      this.candidatos = res['candidatos'];
      this.dataSource = res['candidatos'];
    }, err => {
      this.showMessage('Houve um erro CRITICO ao buscar os candidatos', this.snackBarDuration, true);
    });
  }

  /**
   * Desloga do sistema e abre a página de login
   * @return void
   */
  deslogar(): void {
    localStorage.setItem('permissao', "0");
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/logar']);
  }

  /**
   * Abre a tela de criação de um novo candidato
   * @return void
   */
  novoCandidato(): void {
    this.router.navigate(['/novoCandidato']);
  }

  /**
   * Aprova o plano do candidato
   * @return void
   */
  planoAprovado(c: Candidato): void {
    this.candidatosService.validarPlano(c.id, 1).subscribe(res => {
      if (JSON.stringify(res)) {
        this.showMessage(`O plano ${c.planoNome} do candidato ${c.nome} foi aprovado.`, this.snackBarDuration);
        c.valido = 1;
      } else {
        this.showMessage(`Houve um erro ao aprovar o plano ${c.planoNome} do candidato ${c.nome}.`, this.snackBarDuration, true);
      }
    }, err => {
      this.showMessage(`Houve um erro CRITICO ao aprovar o plano ${c.planoNome} do candidato ${c.nome}.`, this.snackBarDuration, true);
    });
  }

  /**
   * Reprova o plano do candidato
   * @return void
   */
  planoRejeitado(c: Candidato): void {
    this.candidatosService.validarPlano(c.id, 0).subscribe(res => {
      if (JSON.stringify(res)) {
        this.showMessage(`O plano ${c.planoNome} do candidato ${c.nome} foi rejeitado.`, this.snackBarDuration);
        c.valido = 0;
      } else {
        this.showMessage(`Houve um erro ao rejeitar o plano ${c.planoNome} do candidato ${c.nome}.`, this.snackBarDuration, true);
      }
    }, err => {
      this.showMessage(`Houve um erro CRITICO ao rejeitar o plano ${c.planoNome} do candidato ${c.nome}.`, this.snackBarDuration, true);
    });
  }

  /**
   * Edita o plano do candidato
   * @return void
   */
  editarPlano(c: Candidato): void {
    this.router.navigate(['/editarPlano'], { queryParams: c });
  }

  showMessage(message: string, duration: number, isError?: boolean) {
    this.snackbar.open(message, undefined, { duration: duration });
  }

}
