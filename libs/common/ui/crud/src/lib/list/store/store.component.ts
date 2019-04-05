import { Component, OnInit, Input } from '@angular/core';
import { UserModel, RolModel } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CrudService } from '../../service/crud.service';

interface FormBuilderInputs {
  string: [string, Validators[]];
}

interface FormTypeInputs {
  name: string;
  label: string;
  type: string;
}

@Component({
  selector: 'suite-ui-crud-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @Input() title = '';
  @Input() formBuilderDataInputs: FormBuilderInputs;
  @Input() formBuilderTemplateInputs: FormTypeInputs[];
  @Input() validators: {
    validator: any;
  };
  @Input() apiEndpoint: string;
  @Input() redirectTo: string;

  storeForm: FormGroup;
  submitted = false;

  isLoading = false;

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    console.log('formBuilderDataInputs', this.formBuilderDataInputs);
    this.storeForm = this.formBuilder.group(this.formBuilderDataInputs, {
      validator: MustMatch('password', 'confirmPassword')
    });
    console.log(this.f);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.storeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    console.log('submitted');

    // stop here if form is invalid
    if (this.storeForm.invalid) {
      return;
    }

    this.presentLoading();

    this.crudService
      .postStore(this.storeForm.value, this.apiEndpoint)
      .then((data: Observable<HttpResponse<UserModel.ResponseStore>>) => {
        data.subscribe(
          (res: HttpResponse<UserModel.ResponseStore>) => {
            this.dismissLoading();
            this.router.navigate([this.redirectTo]);
            this.presentToast(`Usuario ${res.body.data.name} creado`);
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

// custom validator to check that two fields match
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
