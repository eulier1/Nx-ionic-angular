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
    sga_enabled: [false, []],
    app_enabled: [false, []]
  };
  formBuilderTemplateInputs = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text'
    },
    {
      name: 'sga_enabled',
      label: 'Habilitar en SGA',
      type: 'checkbox',
      value: true
    },
    {
      name: 'app_enabled',
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
