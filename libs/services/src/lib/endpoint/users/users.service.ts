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
import { PATH } from '../../../../../../config/base';
import { forkJoin, concat } from 'rxjs';

export const PATH_GET_INDEX: string = PATH('Users', 'Index');
export const PATH_POST_STORE: string = PATH('Users', 'Store');
export const PATH_GET_SHOW: string = PATH('Users', 'Show').slice(0, -1);
export const PATH_PUT_UPDATE: string = PATH('Users', 'Update').slice(0, -1);
export const PATH_DEL_DESTROY: string = PATH('Users', 'Destroy').slice(0, -1);

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

  async postStore(
    user: UserModel.User
  ): Promise<Observable<HttpResponse<UserModel.ResponseStore>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.post<UserModel.ResponseStore>(PATH_POST_STORE, user, {
      headers: headers,
      observe: 'response'
    });
  }

  async getShow(
    userId: string | number
  ): Promise<Observable<HttpResponse<UserModel.ResponseShow>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<UserModel.ResponseShow>(`${PATH_GET_SHOW}${userId}`, {
      headers: headers,
      observe: 'response'
    });
  }

  async putUpdate(
    user: UserModel.User
  ): Promise<Observable<HttpResponse<UserModel.ResponseUpdate>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.put<UserModel.ResponseUpdate>(
      `${PATH_PUT_UPDATE}${user.id}`,
      user,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }

  async deleteDestroy(
    users: UserModel.User[]
  ): Promise<Observable<HttpResponse<UserModel.ResponseDestroy>>[]> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });

    return users.map(user => {
      return concat(
        this.http.delete<UserModel.ResponseDestroy>(
          `${PATH_DEL_DESTROY}${user.id}`,
          {
            headers: headers,
            observe: 'response'
          }
        )
      );
    });
  }
}
