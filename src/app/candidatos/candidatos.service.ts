import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatosService {

  private readonly URL_SELECIONAR_DADOS = 'http://h-tz.co/hospital/candidato/selecionarCandidatos';
  private readonly URL_VALIDAR_PLANO = 'http://h-tz.co/hospital/plano/validarPlano';

  constructor(private http: HttpClient) { }

  /**
   * Seleciona todos os candidatos do banco de dados
   * @return array
   */
  public selecionarCandidatos(): Observable<any> {
    return this.http.get(this.URL_SELECIONAR_DADOS);
  }

  /**
   * Valida o plano do candidato para 'true' or 'false'
   * @return boolean
   */
  public validarPlano(id:number,validacao:number): Observable<any> {
    return this.http.post(this.URL_VALIDAR_PLANO,{id_candidato:id,validacao:validacao});
  }

}
