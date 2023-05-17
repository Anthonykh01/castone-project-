// import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-registration',
//   templateUrl: 'registration.page.html',
//   styleUrls: ['registration.page.scss'],
// })
// export class RegistrationPage {
//   user = {
//     email: '',
//     password: '',
//   };

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private toastCtrl: ToastController
//   ) {}

//   register() {
//     this.authService.register(this.user).subscribe(
//       (response) => {
//         this.presentToast(response.message);
//         if (response.message === 'User registered successfully.') {
//           this.router.navigate(['/login']);
//         }
//       },
//       (error) => {
//         console.error('Error:', error);
//         this.presentToast('An error occurred. Please try again.');
//       }
//     );
//   }

//   async presentToast(message: string) {
//     const toast = await this.toastCtrl.create({
//       message,
//       duration: 2000,
//     });
//     toast.present();
//   }
// }

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
    // Check if email and password are in correct format
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // eslint-disable-next-line max-len
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // At least one digit, one lowercase, one uppercase letter, minimum 8 characters

    if (!emailFormat.test(this.user.email)) {
      this.presentToast('Invalid email format. Please check your email.');
      return;
    }
    if (!passwordFormat.test(this.user.password)) {
      // eslint-disable-next-line max-len
      this.presentToast('Invalid password format. Password should have at least one digit, one lowercase, one uppercase letter, and be minimum 8 characters long.');
      return;
    }

    // Register user
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
