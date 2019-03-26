import { Component, OnInit } from '@angular/core';

import { LoginService } from '../api/login.service';
import { Router } from '@angular/router';
import {
  ResponseLogin,
  RequestLogin,
  ResponseLogout
} from '../../../../../shared_modules/models/endpoints/OAuth2';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  login(user: RequestLogin) {
    console.log(user);
    this.loginService
      .post_login(user)
      .subscribe((data: HttpResponse<ResponseLogin>) => {
        const response: ResponseLogin = data.body;
        console.log(response);
        this.router.navigate(['/home']);
      });
  }
}
