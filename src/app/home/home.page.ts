import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonMenu,
  IonMenuButton,
  IonButtons, // Importe IonButtons se estiver usando botões no header
  IonIcon, // Importe IonIcon se estiver usando ícones
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonImg,
    IonMenu,
    IonMenuButton, // Adicione IonMenu aqui
    IonButtons, // Adicione IonButtons aqui, se necessário
    IonIcon, // Adicione IonIcon aqui, se necessário
  ],
})
export class HomePage {
  private filmes: any[] = [];

  constructor(private navCtrl: NavController) {}

  async goToSuggestion() {
    try {
      console.log('Iniciando carregamento do dataset...');
      const response = await fetch('../../assets/dataset/filmes.json');
      this.filmes = await response.json();
      console.log('Dataset carregado:', this.filmes);

      console.log('Escolhendo filme aleatório...');
      const filmeAleatorio =
        this.filmes[Math.floor(Math.random() * this.filmes.length)];
      console.log('Filme escolhido:', filmeAleatorio);

      console.log('Salvando filme no localStorage...');
      localStorage.setItem('filmeEscolhido', JSON.stringify(filmeAleatorio));

      // Garante que a navegação ocorra após tudo estar pronto
      setTimeout(() => {
        console.log('Navegando para /suggestion...');
        this.navCtrl.navigateForward('/suggestion');
      }, 100); // Pequeno atraso para garantir consistência
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }
}
