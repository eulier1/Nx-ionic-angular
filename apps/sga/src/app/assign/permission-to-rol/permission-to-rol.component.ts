import { Component, OnInit } from '@angular/core';
import {
  PermissionsService,
  RolesService,
  RolModel,
  PermissionsModel,
  AclService,
  ACLModel
} from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { MatSelectionListChange, MatListOption } from '@angular/material/list';

interface ShowRolPermissions extends PermissionsModel.Permission {
  selected?: boolean;
}

@Component({
  selector: 'suite-permission-to-rol',
  templateUrl: './permission-to-rol.component.html',
  styleUrls: ['./permission-to-rol.component.scss']
})
export class PermissionToRolComponent implements OnInit {
  /* Data Layer */
  permissions: PermissionsModel.Permission[] = [];
  roles: RolModel.Rol[] = [];
  currentRolPermissions: PermissionsModel.Permission[];

  /* Presentation Layer */
  panelOpenState = false;
  rolepermissionsSelected: ShowRolPermissions[] = [];
  isLoadingPermissions = false;
  isLoadingAssignPermissionToRole = false;
  indexSelected = 0;

  constructor(
    private permissionService: PermissionsService,
    private rolesService: RolesService,
    private aclService: AclService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.permissionService
      .getIndex()
      .then(
        (data: Observable<HttpResponse<PermissionsModel.ResponseIndex>>) => {
          data.subscribe(
            (res: HttpResponse<PermissionsModel.ResponseIndex>) => {
              this.permissions = res.body.data;
              console.log(this.permissions);
            }
          );
        }
      );

    this.rolesService
      .getIndex()
      .then((data: Observable<HttpResponse<RolModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<RolModel.ResponseIndex>) => {
          this.roles = res.body.data;
          this.rolepermissionsSelected = this.roles;
          console.log(this.roles);
        });
      });
  }

  showRolPermissions(rolId: number) {
    let selectedPermissions = [];
    let unselectedPermissions = [];
    this.currentRolPermissions = [];
    this.panelOpenState = true;
    this.isLoadingPermissions = true;
    this.aclService
      .getRolPermissions(rolId)
      .then((data: Observable<HttpResponse<ACLModel.ResponseUserRoles>>) => {
        data.subscribe((res: HttpResponse<ACLModel.ResponseUserRoles>) => {
          this.currentRolPermissions =
            res.body.data.length === 0 ? [{ name: '', id: 0 }] : res.body.data;
          console.log('this.permissions', this.permissions);
          console.log('this.currentRolPermissions', this.currentRolPermissions);
          this.isLoadingPermissions = false;
          this.rolepermissionsSelected = [];
          // Applying Intersection, to get user roles selected
          selectedPermissions = this.permissions.filter((rol: RolModel.Rol) =>
            this.currentRolPermissions.find(rolData => rolData.id === rol.id)
          );

          // Applying Diference, to get user roles not selected
          unselectedPermissions = this.permissions.filter(
            (rol: RolModel.Rol) =>
              !this.currentRolPermissions.find(rolData => rolData.id === rol.id)
          );

          // adding selected property for mat-list-option component
          selectedPermissions = selectedPermissions.map((rol: RolModel.Rol) => {
            return { ...rol, selected: true };
          });

          unselectedPermissions = unselectedPermissions.map(
            (rol: RolModel.Rol) => {
              return { ...rol, selected: false };
            }
          );

          this.rolepermissionsSelected.push(
            ...selectedPermissions,
            ...unselectedPermissions
          );

          console.log('selectedRoles', selectedPermissions);
          console.log('unselectedRoles', unselectedPermissions);

          console.log(this.rolepermissionsSelected);
        });
      });
  }

  assignPermissionToRol(
    permission: ShowRolPermissions,
    indexSelected: number,
    rol: RolModel.Rol,
    ev: MatListOption
  ) {
    this.isLoadingAssignPermissionToRole = true;
    console.log('assignPermissionToRol', permission);

    // Assign New Permission
    if (
      (ev.selected && !permission.selected) ||
      (ev.selected && permission.selected)
    ) {
      this.permissionService
        .postAssignPermissionToRol(rol.id, permission.id)
        .then((data: Observable<HttpResponse<ACLModel.ResponseUserRoles>>) => {
          data.subscribe(
            (res: HttpResponse<ACLModel.ResponseUserRoles>) => {
              this.isLoadingAssignPermissionToRole = false;
              ev.selected = true;
              this.presentToast(
                `Permiso ${rol.name} ha sido asignado Rol ${permission.name}`
              );
            },
            (errorResponse: HttpErrorResponse) => {
              this.isLoadingAssignPermissionToRole = false;
              this.presentToast(
                `${errorResponse.status} - ${errorResponse.message}`
              );
              ev.selected = false;
              // Unselect option due network error
              this.rolepermissionsSelected.splice(indexSelected, 1, {
                ...permission,
                selected: false
              });
            }
          );
        });
    }
    // Delete Rol
    if (
      (!ev.selected && permission.selected) ||
      (!ev.selected && !permission.selected)
    ) {
      console.log('Delete');
      this.permissionService
        .deletePermissionToRol(rol.id, permission.id)
        .then(
          (data: Observable<HttpResponse<ACLModel.ResponseDeleteUserRol>>) => {
            data.subscribe(
              (res: HttpResponse<ACLModel.ResponseDeleteUserRol>) => {
                this.isLoadingAssignPermissionToRole = false;
                ev.selected = false;
                this.presentToast(
                  `Permiso ${permission.name} fue removido de ${rol.name}`
                );
              },
              (errorResponse: HttpErrorResponse) => {
                this.isLoadingAssignPermissionToRole = false;
                this.presentToast(
                  `${errorResponse.status} - ${errorResponse.message}`
                );
                ev.selected = true;
                // Unselect option due network error
                this.rolepermissionsSelected.splice(indexSelected, 1, {
                  ...permission,
                  selected: true
                });
              }
            );
          }
        );
    }
  }

  trackById(index: number, permission: ShowRolPermissions): number {
    return permission.id;
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
