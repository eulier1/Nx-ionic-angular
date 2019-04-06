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
    sga_allowed: [false, []],
    app_allowed: [false, []]
  };
  formBuilderTemplateInputs = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text'
    },
    {
      name: 'sga_allowed',
      label: 'Habilitar en SGA',
      type: 'checkbox',
      value: true
    },
    {
      name: 'app_allowed',
      label: 'Habilitar en APP',
      type: 'checkbox',
      value: false
    }
  ];
  title = 'Actualizar Rol';
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Roles')
    .name;
  redirectTo = '/roles';

  constructor() {}

  ngOnInit() {}
}
