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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  async debugListUsers() {
  const res = await this.db['dbInstance'].executeSql(`SELECT * FROM users`, []);
  console.log('Usuários cadastrados:');
  for (let i = 0; i < res.rows.length; i++) {
    console.log(res.rows.item(i));
  }
}


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DatabaseService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.senhasIguais.bind(this) }
    );
  }

  ngOnInit() {}

  senhasIguais(formGroup: FormGroup) {
    const senha = formGroup.get('password')?.value;
    const confirmSenha = formGroup.get('confirmPassword')?.value;

    if (senha !== confirmSenha) {
      formGroup.get('confirmPassword')?.setErrors({ senhasDiferentes: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      const success = await this.db.addUser(name, email, password);

      if (success) {
        this.router.navigate(['/login']);
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}


