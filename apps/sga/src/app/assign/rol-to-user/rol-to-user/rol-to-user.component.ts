import { Component, OnInit } from '@angular/core';
import {
  UsersService,
  RolesService,
  RolModel,
  UserModel,
  AclService,
  ACLModel
} from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { MatSelectionListChange, MatListOption } from '@angular/material/list';

interface ShowUserRoles extends RolModel.Rol {
  selected?: boolean;
}

@Component({
  selector: 'suite-rol-to-user',
  templateUrl: './rol-to-user.component.html',
  styleUrls: ['./rol-to-user.component.scss']
})
export class RolToUserComponent implements OnInit {
  /* Data Layer */
  users: UserModel.User[] = [];
  roles: RolModel.Rol[] = [];
  currentUserRoles: RolModel.Rol[];

  /* Presentation Layer */
  panelOpenState = false;
  userRolesSelected: ShowUserRoles[] = [];
  isLoadingRoles = false;
  isLoadingAssignRoleToUser = false;
  indexSelected = 0;

  constructor(
    private userService: UsersService,
    private rolesService: RolesService,
    private aclService: AclService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userService
      .getIndex()
      .then((data: Observable<HttpResponse<UserModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<UserModel.ResponseIndex>) => {
          this.users = res.body.data;
          console.log(this.users);
        });
      });

    this.rolesService
      .getIndex()
      .then((data: Observable<HttpResponse<RolModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<RolModel.ResponseIndex>) => {
          this.roles = res.body.data;
          this.userRolesSelected = this.roles;
          console.log(this.roles);
        });
      });
  }

  showUserRoles(userId: number) {
    let selectedRoles = [];
    let unselectedRoles = [];
    this.currentUserRoles = [];
    this.panelOpenState = true;
    this.isLoadingRoles = true;
    this.aclService
      .getUserRoles(userId)
      .then((data: Observable<HttpResponse<ACLModel.ResponseUserRoles>>) => {
        data.subscribe((res: HttpResponse<ACLModel.ResponseUserRoles>) => {
          this.currentUserRoles =
            res.body.data.length === 0 ? [{ name: '', id: 0 }] : res.body.data;
          console.log('this.roles', this.roles);
          console.log('this.roles', this.currentUserRoles);
          this.isLoadingRoles = false;
          this.userRolesSelected = [];
          // Applying Intersection, to get user roles selected
          selectedRoles = this.roles.filter((rol: RolModel.Rol) =>
            this.currentUserRoles.find(rolData => rolData.id === rol.id)
          );

          // Applying Diference, to get user roles not selected
          unselectedRoles = this.roles.filter(
            (rol: RolModel.Rol) =>
              !this.currentUserRoles.find(rolData => rolData.id === rol.id)
          );

          // adding selected property for mat-list-option component
          selectedRoles = selectedRoles.map((rol: RolModel.Rol) => {
            return { ...rol, selected: true };
          });

          unselectedRoles = unselectedRoles.map((rol: RolModel.Rol) => {
            return { ...rol, selected: false };
          });

          this.userRolesSelected.push(...selectedRoles, ...unselectedRoles);

          console.log('selectedRoles', selectedRoles);
          console.log('unselectedRoles', unselectedRoles);

          console.log(this.userRolesSelected);
        });
      });
  }

  assignRoleToUser(
    rol: ShowUserRoles,
    indexSelected: number,
    user: UserModel.User,
    ev: MatListOption
  ) {
    this.isLoadingAssignRoleToUser = true;
    console.log('assignRoleToUser', rol);

    // Assign New Rol
    if ((ev.selected && !rol.selected) || (ev.selected && rol.selected)) {
      this.rolesService
        .postAssignRolToUser(user.id, rol.id)
        .then((data: Observable<HttpResponse<ACLModel.ResponseUserRoles>>) => {
          data.subscribe(
            (res: HttpResponse<ACLModel.ResponseUserRoles>) => {
              this.isLoadingAssignRoleToUser = false;
              ev.selected = true;
              this.presentToast(
                `Usuario ${user.name} ha sido asignado Rol ${rol.name}`
              );
            },
            (errorResponse: HttpErrorResponse) => {
              this.isLoadingAssignRoleToUser = false;
              this.presentToast(
                `${errorResponse.status} - ${errorResponse.message}`
              );
              ev.selected = false;
              // Unselect option due network error
              this.userRolesSelected.splice(indexSelected, 1, {
                ...rol,
                selected: false
              });
            }
          );
        });
    }
    // Delete Rol
    if ((!ev.selected && rol.selected) || (!ev.selected && !rol.selected)) {
      console.log('Delete');
      this.rolesService
        .deleteRolToUser(user.id, rol.id)
        .then(
          (data: Observable<HttpResponse<ACLModel.ResponseDeleteUserRol>>) => {
            data.subscribe(
              (res: HttpResponse<ACLModel.ResponseDeleteUserRol>) => {
                this.isLoadingAssignRoleToUser = false;
                ev.selected = false;
                this.presentToast(
                  `Rol ${rol.name} fue removido de ${user.name}`
                );
              },
              (errorResponse: HttpErrorResponse) => {
                this.isLoadingAssignRoleToUser = false;
                this.presentToast(
                  `${errorResponse.status} - ${errorResponse.message}`
                );
                ev.selected = true;
                // Unselect option due network error
                this.userRolesSelected.splice(indexSelected, 1, {
                  ...rol,
                  selected: true
                });
              }
            );
          }
        );
    }
  }

  trackById(index: number, userRol: ShowUserRoles): number {
    return userRol.id;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 4550
    });
    toast.present();
  }
}
