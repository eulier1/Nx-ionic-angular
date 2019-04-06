import { Component, OnInit } from '@angular/core';
import { RolModel } from '@suite/services';
import { COLLECTIONS } from 'config/base';
@Component({
  selector: 'suite-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  title = 'Roles';
  displayedColumns: string[] = ['id', 'name', 'select'];
  columns: string[] = ['id', 'name'];
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Roles')
    .name;
  routePath = '/roles';

  constructor() {}

  ngOnInit() {}
}
