import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { UserModel } from '../../../models/endpoints/User';
import { PATH } from '../../../api/base';

export const PATH_GET_INDEX: string = PATH('Users', 'Index');

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getIndex(): Promise<Observable<HttpResponse<UserModel.ResponseIndex>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<UserModel.ResponseIndex>(PATH_GET_INDEX, {
      headers: headers,
      observe: 'response'
    });
  }
}
