import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.presentToast(response.message);
        if (response.message === 'Login successful.') {
          localStorage.setItem('email', response.email);
          this.router.navigate(['/third-page']);
        }
      },
      (error) => {
        console.error('Error:', error);
        this.presentToast('An error occurred. Please try again.');
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
