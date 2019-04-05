import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

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
  apiEndpoint = 'Users';
  redirectTo = 'users';

  constructor() {}

  ngOnInit() {}
}
