import { Component, OnInit } from '@angular/core';
import { UsersService, UserModel } from '@suite/services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, ParamMap, Router, Route } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'suite-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  user: UserModel.User;
  userEditForm: FormGroup;
  submitted = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
    this.userEditForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', []],
        confirmPassword: ['']
      },
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    );
    console.log('update');
  }

  getUser() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return from(
            this.usersService
              .getShow(params.get('id'))
              .then(
                (data: Observable<HttpResponse<UserModel.ResponseShow>>) => {
                  data.subscribe(
                    (res: HttpResponse<UserModel.ResponseShow>) => {
                      this.userEditForm.patchValue({
                        name: res.body.data.name,
                        email: res.body.data.email
                      });
                      this.user = res.body.data;
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

    const user: UserModel.User = {
      id: this.user.id,
      name: this.userEditForm.get('name').value,
      email: this.userEditForm.get('email').value,
      password: this.userEditForm.get('password').value
    };

    this.usersService
      .putUpdate(user)
      .then((data: Observable<HttpResponse<UserModel.ResponseStore>>) => {
        data.subscribe(
          (res: HttpResponse<UserModel.ResponseStore>) => {
            this.router.navigate(['users']);
            this.presentToast(`Usuario ${res.body.data.name} actualizado`);
          },
          (errorResponse: HttpErrorResponse) => {
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
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
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
