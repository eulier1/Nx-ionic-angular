import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { RolModel, RolesService } from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';

@Component({
  selector: 'suite-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
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
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'select'];
  dataSource: RolModel.Rol[] = [];
  selection = new SelectionModel<RolModel.Rol>(true, []);
  navStart: Observable<NavigationStart>;

  showDeleteButton = false;
  isLoading = false;

  constructor(
    private rolesServices: RolesService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    public loadingController: LoadingController
  ) {
    console.log(this.dataSource);

    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
    this.initRoles();
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      console.log(evt);
      if (evt.url === '/roles') {
        this.initRoles();
      }
    });
  }

  initRoles() {
    this.rolesServices
      .getIndex()
      .then((data: Observable<HttpResponse<RolModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<RolModel.ResponseIndex>) => {
          this.dataSource = res.body.data;
          console.log(this.dataSource);
        });
      });
    this.selection = new SelectionModel<RolModel.Rol>(true, []);
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
  checkboxLabel(row?: RolModel.Rol): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }

  checkSelection(row?: RolModel.Rol) {
    this.selection.toggle(row);
    if (this.selection.selected.length > 0) {
      this.showDeleteButton = true;
    } else {
      this.showDeleteButton = false;
    }
  }

  confirmDelete() {
    if (this.selection.selected.length > 0) {
      this.presentUsertDeleteAlert(this.selection);
    }
    console.log('confirmDelete', this.selection.selected);
  }

  async presentUsertDeleteAlert(selectedUsers: SelectionModel<RolModel.Rol>) {
    let header = '';
    let msg = '';
    let successMsg = '';

    if (selectedUsers.selected.length > 1) {
      header = 'Eliminar Usuarios';
      msg = `Estas a punto de eliminar <br>
      <strong>${selectedUsers.selected.length} usuarios</strong>.<br>
      ¿Esta seguro?`;
      successMsg = `${selectedUsers.selected.length} usuarios eliminados`;
    } else {
      header = 'Eliminar Usuario';
      msg = `Estas a punto de eliminar <br> 
      el usuario ${selectedUsers.selected.map(value => value.name.bold())}.<br> 
      ¿Esta seguro? `;
      successMsg = `Usuario ${selectedUsers.selected.map(
        value => value.name
      )} eliminado`;
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
            this.presentLoading();
            this.rolesServices
              .deleteDestroy(this.selection.selected)
              .then(
                (
                  data: Observable<HttpResponse<RolModel.ResponseDestroy>>[]
                ) => {
                  data.map(
                    (
                      response$: Observable<
                        HttpResponse<RolModel.ResponseDestroy>
                      >
                    ) => {
                      response$.subscribe(
                        (response: HttpResponse<RolModel.ResponseDestroy>) => {
                          console.log(
                            `${response.body.data} - ${response.body.code} - ${
                              response.body.message
                            }`
                          );
                          this.presentToast(successMsg);
                          this.dismissLoading();
                          this.initRoles();
                        },
                        (errorResponse: HttpErrorResponse) => {
                          this.presentToast(errorResponse.message);
                          console.log(errorResponse);
                          this.dismissLoading();
                          this.initRoles();
                        }
                      );
                    }
                  );
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 2750
    });
    toast.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: 'Un momento ...'
      })
      .then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log('dismissed'));
  }
}
