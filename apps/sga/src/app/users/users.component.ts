import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { UserModel, UsersService } from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'suite-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('0.17s ease-in-out')
      ]),
      transition(':leave', [
        animate('0.17s ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  dataSource: UserModel.User[] = [];
  selection = new SelectionModel<UserModel.User>(true, []);
  navStart: Observable<NavigationStart>;
  showDeleteButton = false;

  constructor(
    private userService: UsersService,
    private router: Router,
    private alertController: AlertController
  ) {
    console.log(this.dataSource);

    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
    this.initUsers();
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      console.log(evt);
      if (evt.url === '/users') {
        this.initUsers();
      }
    });
  }

  initUsers() {
    this.userService
      .getIndex()
      .then((data: Observable<HttpResponse<UserModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<UserModel.ResponseIndex>) => {
          this.dataSource = res.body.data;
          console.log(this.dataSource);
        });
      });
    this.selection = new SelectionModel<UserModel.User>(true, []);
    this.showDeleteButton = false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach(row => this.selection.select(row));

    this.isAllSelected()
      ? (this.showDeleteButton = true)
      : (this.showDeleteButton = false);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserModel.User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }

  checkSelection(row?: UserModel.User) {
    this.selection.toggle(row);
    if (this.selection.selected.length > 0) {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  confirmDelete() {
    if (this.selection.selected.length > 0) {
      this.presentPasswordAlert(this.selection);
    }
    console.log('confirmDelete', this.selection.selected);
  }

  async presentPasswordAlert(selectedUsers: SelectionModel<UserModel.User>) {
    let header = '';
    let msg = '';

    if (selectedUsers.selected.length > 1) {
      header = 'Eliminar Usuarios';
      msg = `Estas a punto de eliminar <br>
      <strong>${selectedUsers.selected.length} usuarios</strong>.<br>
      ¿Esta seguro?`;
    } else {
      header = 'Eliminar Usuario';
      msg = `Estas a punto de eliminar <br> 
      el usuario ${selectedUsers.selected.map(value => value.name.bold())}.<br> 
      ¿Esta seguro? `;
    }

    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Vale',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
