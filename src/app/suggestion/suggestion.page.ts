import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.page.html',
  styleUrls: ['./suggestion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
  @ViewChild('containerRef', { static: false }) containerRef!: ElementRef;

  filme: any = {}; // Inicializa como objeto vazio para evitar "undefined"
  private readonly FILMES_JSON = '../../assets/dataset/filmes.json';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.carregarFilme();
  }

  carregarFilme() {
    const filmeSalvo = localStorage.getItem('filmeEscolhido');
    if (filmeSalvo) {
      this.filme = JSON.parse(filmeSalvo);
    } else {
      this.carregarFilmeAleatorio();
    }
  }

  async carregarFilmeAleatorio() {
    const container = this.containerRef.nativeElement;

    // animação de saída
    container.classList.add('fade-out');

    // espera 1.5 s antes de trocar o filme
    setTimeout(async () => {
      try {
        const response = await fetch(this.FILMES_JSON);
        const filmes = await response.json();

        const index = Math.floor(Math.random() * filmes.length);
        this.filme = filmes[index];

        localStorage.setItem('filmeEscolhido', JSON.stringify(this.filme));
      } catch (error) {
        console.error('Erro ao carregar o dataset:', error);
        this.filme = {};
      }

      // animação de entrada
      container.classList.remove('fade-out');
      container.classList.add('fade-in');

      // remove 'fade-in' depois que terminar (0.5 s)
      setTimeout(() => container.classList.remove('fade-in'), 500);
    }, 1500); // 1.5 s
  }

 goToHome() {
  this.navCtrl.navigateBack('/home', {
    animated: true,
    animationDirection: 'back',
  });
 }
}
