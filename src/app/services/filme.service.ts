import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  private filmeEscolhido: any = null;

  setFilme(filme: any) {
    this.filmeEscolhido = filme;
  }

  getFilme() {
    return this.filmeEscolhido;
  }
}
