import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'suite-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  formBuilderDataInputs = {
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  };
  formBuilderTemplateInputs = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text'
    },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email'
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password'
    },
    {
      name: 'confirmPassword',
      label: 'Confirmar Contraseña',
      type: 'password'
    }
  ];
  isLoading = false;
  title = 'Usuario Create Test';
  apiEndpoint = 'Users';
  redirectTo = 'users';

  constructor() {}

  ngOnInit() {}
}
