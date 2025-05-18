import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonMenu,
  IonMenuButton,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonImg,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonIcon,
  ],
})
export class SuggestionPage implements OnInit {
  filme: any = {}; // Inicializa como um objeto vazio para evitar "undefined"

  // Caminho do JSON
  private readonly FILMES_JSON = '../../assets/dataset/filmes.json';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.carregarFilme();
  }

  carregarFilme() {
    // Tenta recuperar o filme do localStorage
    const filmeSalvo = localStorage.getItem('filmeEscolhido');
    if (filmeSalvo) {
      this.filme = JSON.parse(filmeSalvo); // Usa o filme salvo
    } else {
      // Se não houver filme no localStorage, carrega um novo aleatório
      this.carregarFilmeAleatorio();
    }
  }

  async carregarFilmeAleatorio() {
    try {
      const response = await fetch(this.FILMES_JSON);
      const filmes = await response.json();

      // Escolhe um filme aleatório
      const index = Math.floor(Math.random() * filmes.length);
      this.filme = filmes[index];

      // Atualiza localStorage (opcional)
      localStorage.setItem('filmeEscolhido', JSON.stringify(this.filme));
    } catch (error) {
      console.error('Erro ao carregar o dataset:', error);
      this.filme = {}; // Garante que o objeto seja redefinido em caso de erro
    }
  }

  goToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
