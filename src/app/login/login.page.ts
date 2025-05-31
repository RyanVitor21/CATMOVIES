import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/core/service/database.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonImg,
  IonInput,
  IonLabel,
  IonText,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonImg,
    IonInput,
    IonLabel,
    IonText,
    IonButtons,
    IonBackButton,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DatabaseService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit() {
     if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    const isValid = await this.db.validateUser(email, password);

    this.loginError = !isValid;

    if (isValid) {
      localStorage.setItem('isLoggedIn', 'true'); // 👈 marca como logado
      this.router.navigate(['/suggestion']);       // 👈 vai direto pra suggestion
    }
  }
}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
