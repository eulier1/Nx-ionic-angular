import { Component, OnInit } from '@angular/core';
import { UserModel } from '@suite/services';
import { COLLECTIONS } from 'config/base';

@Component({
  selector: 'suite-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'Usuarios';
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  columns: string[] = ['id', 'name', 'email'];
  apiEndpoint = COLLECTIONS.find(collection => collection.name === 'Roles')
    .name;
  routePath = '/users';

  constructor() {}

  ngOnInit() {}
}
