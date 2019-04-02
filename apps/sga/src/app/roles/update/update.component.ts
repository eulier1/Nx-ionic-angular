import { Component, OnInit } from '@angular/core';
import { RolModel, RolesService } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'suite-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  rol: RolModel.Rol;
  userEditForm: FormGroup;
  submitted = false;

  isLoading = false;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getUser();
    this.userEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
    console.log('update');
  }

  getUser() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return from(
            this.rolesService
              .getShow(params.get('id'))
              .then((data: Observable<HttpResponse<RolModel.ResponseShow>>) => {
                data.subscribe(
                  (res: HttpResponse<RolModel.ResponseShow>) => {
                    this.userEditForm.patchValue({
                      name: res.body.data.name
                    });
                    this.rol = res.body.data;
                  },
                  (errorResponse: HttpErrorResponse) => {
                    this.presentToast('Error - Errores no estandarizados');
                  }
                );
              })
          );
        })
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userEditForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log('submitted');

    // stop here if form is invalid
    if (this.userEditForm.invalid) {
      return;
    }

    this.presentLoading();

    const rol: RolModel.Rol = {
      id: this.rol.id,
      name: this.userEditForm.get('name').value
    };

    this.rolesService
      .putUpdate(rol)
      .then((data: Observable<HttpResponse<RolModel.ResponseStore>>) => {
        data.subscribe(
          (res: HttpResponse<RolModel.ResponseStore>) => {
            this.dismissLoading();
            this.router.navigate(['roles']);
            this.presentToast(`Rol ${res.body.data.name} actualizado`);
          },
          (errorResponse: HttpErrorResponse) => {
            this.dismissLoading();
            this.presentToast('Error - Errores no estandarizados');
          }
        );
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 3750
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
