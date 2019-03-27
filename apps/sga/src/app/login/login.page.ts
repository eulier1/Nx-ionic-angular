import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import {
  ResponseLogin,
  RequestLogin,
  ErrorResponseLogin
} from '../../../../../shared_modules/models/endpoints/OAuth2';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user: RequestLogin = {
    username: 'conde@montecristo.fr',
    password: 'lecomtedemontecristo',
    grant_type: 'password'
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  login(user: RequestLogin) {
    console.log(user);
    this.loginService.post_login(user).subscribe(
      (data: HttpResponse<ResponseLogin>) => {
        const response: ResponseLogin = data.body;
        console.log(response);
        this.authenticationService.login(data.body.data.access_token);
        this.router.navigate(['/home']);
      },
      (errorResponse: HttpErrorResponse) => {
        const error: ErrorResponseLogin = errorResponse.error;
        this.presentToast(error.data.msg);
        console.log(error);
      }
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2750
    });
    toast.present();
  }

  async presentPasswordAlert() {
    const alert = await this.alertController.create({
      header: '¿Contraseña?',
      message: `Si has olvidado tu contraseña o no tienes acceso a tu perfil ponte en contacto con tu
        supervisor y él buscará cual es tu contraseña actual o te dará nuevos datos de acceso.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
