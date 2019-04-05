import { Component, OnInit } from '@angular/core';
import { UserModel } from '@suite/services';

@Component({
  selector: 'suite-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'Usuarios';
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  columns: string[] = ['id', 'name', 'email'];
  user: UserModel.User = { id: 0, name: '', password: '', email: '' };
  apiEndpoint = 'Users';
  routePath = '/users';

  constructor() {}

  ngOnInit() {}
}
