import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { COLLECTIONS } from 'config/base';

@Component({
  selector: 'suite-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
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
  title = 'Actualizar Usuario';
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Users')
    .name;
  redirectTo = 'users/list';
  routePath = '/users';
  customValidators: {
    name: string;
    params: [];
  } = {
    name: 'MustMach',
    params: []
  };

  constructor() {}

  ngOnInit() {}
}
