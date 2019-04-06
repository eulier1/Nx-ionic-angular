import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormArray } from '@angular/forms';
import { COLLECTIONS } from 'config/base';

@Component({
  selector: 'suite-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  formBuilderTemplateInputs = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text'
    },
    {
      name: 'sga_enabled',
      label: 'Habilitar SGA',
      type: 'checkbox',
      value: false
    },
    {
      name: 'app_enabled',
      label: 'Habilitar APP',
      type: 'checkbox',
      value: false
    }
  ];
  formBuilderDataInputs = {
    name: ['', [Validators.required, Validators.minLength(4)]],
    sga_enabled: [this.formBuilderTemplateInputs[1].value, []],
    app_enabled: [this.formBuilderTemplateInputs[2].value, []]
  };
  title = 'Actualizar Rol';
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Roles')
    .name;
  redirectTo = '/roles';

  constructor() {}

  ngOnInit() {}
}
