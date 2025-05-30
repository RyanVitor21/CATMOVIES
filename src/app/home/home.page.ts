import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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
    IonMenuButton,
    IonButtons,
    IonIcon,
  ],
})
export class HomePage {
  private filmes: any[] = [];

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  async goToSuggestion() {
    try {
      // ✅ Corrigido o caminho do JSON para funcionar em dispositivos Android e Web
      const response = await fetch('assets/dataset/filmes.json');
      this.filmes = await response.json();

      const filmeAleatorio =
        this.filmes[Math.floor(Math.random() * this.filmes.length)];
      localStorage.setItem('filmeEscolhido', JSON.stringify(filmeAleatorio));

      this.navCtrl.navigateForward('/suggestion');
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
