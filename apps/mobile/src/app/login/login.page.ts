import { Component, OnInit } from '@angular/core';

import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    console.log(this.loginService.getAPI());
  }
}
