import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.page.html',
  styleUrls: ['registration.page.scss'],
})
export class RegistrationPage {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.presentToast(response.message);
        if (response.message === 'User registered successfully.') {
          this.router.navigate(['/login']);
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

