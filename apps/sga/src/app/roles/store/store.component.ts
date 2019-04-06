import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { COLLECTIONS } from 'config/base';
import { RolModel } from '@suite/services';

@Component({
  selector: 'suite-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
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
  title = 'Crear Rol';
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Roles')
    .name;
  redirectTo = '/roles';

  constructor() {}

  ngOnInit() {}
}
