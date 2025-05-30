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
      { validators: this.senhasIguais }
    );
  }

  ngOnInit() {}

  senhasIguais(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : group.get('confirmPassword')?.setErrors({ senhasDiferentes: true });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      const success = await this.db.addUser(name, email, password, confirmPassword);
      if (success) {
        this.router.navigate(['/login']);
      }
    }
  }

  async debugListUsers() {
    const users = await this.db.getAllUsers();
    console.table(users);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
