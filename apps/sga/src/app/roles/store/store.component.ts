import { Component, OnInit } from '@angular/core';
import { RolModel, RolesService } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'suite-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  rolForm: FormGroup;
  submitted = false;

  isLoading = false;

  constructor(
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.rolForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

    console.log(this.f);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.rolForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log('submitted');

    // stop here if form is invalid
    if (this.rolForm.invalid) {
      return;
    }

    this.presentLoading();
    const rol: RolModel.Rol = {
      name: this.rolForm.get('name').value
    };

    this.rolesService
      .postStore(rol)
      .then((data: Observable<HttpResponse<RolModel.ResponseStore>>) => {
        data.subscribe(
          (res: HttpResponse<RolModel.ResponseStore>) => {
            this.dismissLoading();
            this.router.navigate(['roles']);
            this.presentToast(`Rol ${res.body.data.name} creado`);
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
