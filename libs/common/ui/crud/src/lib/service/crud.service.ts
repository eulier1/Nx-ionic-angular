import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '@suite/services';

import { UserModel, RolModel } from '@suite/services';
import { PATH } from '../../../../../../../config/base';
import { concat, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getIndex(
    apiEndpoint: string
  ): Promise<Observable<HttpResponse<UserModel.ResponseIndex>>> {
    const PATH_GET_INDEX = PATH(apiEndpoint, 'Index');
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<UserModel.ResponseIndex>(PATH_GET_INDEX, {
      headers: headers,
      observe: 'response'
    });
  }

  async postStore(
    user: UserModel.User | RolModel.Rol,
    apiEndpoint: string
  ): Promise<Observable<HttpResponse<UserModel.ResponseStore>>> {
    const PATH_POST_STORE = PATH(apiEndpoint, 'Store');
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.post<UserModel.ResponseStore>(PATH_POST_STORE, user, {
      headers: headers,
      observe: 'response'
    });
  }

  async getShow(
    userId: string | number,
    apiEndpoint: string
  ): Promise<Observable<HttpResponse<UserModel.ResponseShow>>> {
    const PATH_GET_SHOW = PATH(apiEndpoint, 'Show').slice(0, -1);
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<UserModel.ResponseShow>(`${PATH_GET_SHOW}${userId}`, {
      headers: headers,
      observe: 'response'
    });
  }

  async putUpdate(
    user: UserModel.User | RolModel.Rol,
    apiEndpoint: string
  ): Promise<Observable<HttpResponse<UserModel.ResponseUpdate>>> {
    const PATH_PUT_UPDATE: string = PATH(apiEndpoint, 'Update').slice(0, -1);
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
    users: UserModel.User[],
    apiEndpoint: string
  ): Promise<Observable<HttpResponse<UserModel.ResponseDestroy>>[]> {
    const PATH_DEL_DESTROY: string = PATH(apiEndpoint, 'Destroy').slice(0, -1);
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
