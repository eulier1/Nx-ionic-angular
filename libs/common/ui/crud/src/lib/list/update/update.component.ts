import { Component, OnInit, Input, NgZone } from '@angular/core';
import { UserModel, RolModel } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationStart,
  NavigationEnd
} from '@angular/router';

import { CrudService } from '../../service/crud.service';
import { switchMap, filter } from 'rxjs/operators';

interface FormBuilderInputs {
  string: [string, Validators[]];
}

interface FormTypeInputs {
  name: string;
  label: string;
  type: string;
  value?: any;
}

@Component({
  selector: 'suite-ui-crud-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @Input() title = '';
  @Input() formBuilderDataInputs: FormBuilderInputs;
  @Input() formBuilderTemplateInputs: FormTypeInputs[];
  @Input() validators: {
    validator: any;
  };
  @Input() apiEndpoint: string;
  @Input() redirectTo: string;
  @Input() customValidators: {
    name: string;
    params: any[];
  } = {
    name: '',
    params: []
  };

  paramId: string | number;
  validator = {};

  //Presentation Layer
  updateForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.initCustomValidators();
    this.updateForm = this.formBuilder.group(
      this.formBuilderDataInputs,
      this.validator
    );
    this.getUser();
    console.log(this.updateForm);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateForm.controls;
  }

  initCustomValidators() {
    if (this.customValidators.name === 'MustMach') {
      this.validator = {
        validator: MustMatch('password', 'confirmPassword')
      };
    }
  }

  goToList() {
    this.zone.runTask(() => this.router.navigate([`${this.redirectTo}`]));
  }

  getUser() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return from(
            this.crudService
              .getShow(params.get('id'), this.apiEndpoint)
              .then(
                (
                  data: Observable<
                    HttpResponse<UserModel.ResponseShow | RolModel.ResponseShow>
                  >
                ) => {
                  data.subscribe(
                    (
                      res: HttpResponse<
                        UserModel.ResponseShow | RolModel.ResponseShow
                      >
                    ) => {
                      let updateFormValue: { string: any };
                      this.paramId = params.get('id');

                      for (const key in res.body.data) {
                        if (res.body.data.hasOwnProperty(key)) {
                          updateFormValue = {
                            ...updateFormValue,
                            [key]: res.body.data[key]
                          };
                        }
                      }

                      console.log('updateFormValue', updateFormValue);

                      this.updateForm.patchValue(updateFormValue);
                    },
                    (errorResponse: HttpErrorResponse) => {
                      this.presentToast('Error - Errores no estandarizados');
                    }
                  );
                }
              )
          );
        })
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  onSubmit() {
    this.submitted = true;

    console.log('submitted');

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.formBuilderTemplateInputs.map((input, i) => {
      if (input.type === 'checkbox') {
        console.log(input.name, this.updateForm.get(input.name));
      }
    });

    const dataToUpdate = { ...this.updateForm.value, id: this.paramId };

    console.log('dataToUpdate', this.updateForm.value);

    this.presentLoading();

    this.crudService
      .putUpdate(dataToUpdate, this.apiEndpoint)
      .then(
        (
          data: Observable<
            HttpResponse<UserModel.ResponseStore | RolModel.ResponseShow>
          >
        ) => {
          data.subscribe(
            (
              res: HttpResponse<UserModel.ResponseStore | RolModel.ResponseShow>
            ) => {
              this.dismissLoading();
              this.zone.runTask(() => this.router.navigate([this.redirectTo]));
              this.presentToast(`Usuario ${res.body.data.name} actualizado`);
            },
            (errorResponse: HttpErrorResponse) => {
              this.dismissLoading();
              this.presentToast('Error - Errores no estandarizados');
            }
          );
        }
      );
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
