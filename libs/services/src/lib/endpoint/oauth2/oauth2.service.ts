import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import {
  RequestLogin,
  ResponseLogin,
  ResponseLogout
} from '../../../models/endpoints/OAuth2';

import {
  HeaderEntity,
  BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity
} from '../../../models/Api.Team.postman_collection';

import { Observable } from 'rxjs/internal/Observable';

import { PATH, HEADERS, AUTH, ACCESS_TOKEN } from '../../../api/base';
import { Auth1 } from '../../../models/Api.Team.postman_collection';

export const HEADERS_LOGIN: any[] = HEADERS('OAuth2', 'Login');
export const AUTH_LOGIN: Auth1 = AUTH('OAuth2', 'Login');
export const PATH_POST_LOGIN: string = PATH('OAuth2', 'Login');

export const AUTH_LOGOUT: Auth1 = AUTH('OAuth2', 'Logout');
export const PATH_GET_LOGOUT: string = PATH('OAuth2', 'Logout');
export const ACCESS_TOKEN_LOGOUT = ACCESS_TOKEN;

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  constructor(private http: HttpClient) {}

  post_login(user: RequestLogin): Observable<HttpResponse<ResponseLogin>> {
    const authType = `Basic ${this._authBasicString()}`;
    const headers = new HttpHeaders(this._headers(authType));

    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('grant_type', user.grant_type);

    return this.http.post<ResponseLogin>(PATH_POST_LOGIN, body, {
      headers: headers,
      observe: 'response'
    });
  }

  get_logout(currentAccessToken): Observable<HttpResponse<ResponseLogout>> {
    const authType = `${currentAccessToken}`;
    const headers = new HttpHeaders(this._headers(authType));

    return this.http.get<ResponseLogout>(PATH_GET_LOGOUT, {
      headers: headers,
      observe: 'response'
    });
  }

  private _headers(authValue: string) {
    const headers = HEADERS_LOGIN.map((header: HeaderEntity) => {
      return {
        key: header.key,
        value: header.value
      };
    });

    headers.push({
      key: 'Authorization',
      value: authValue
    });

    const result = headers.reduce(
      (object, key) => ({ [key.key]: key.value }),
      {}
    );

    return result;
  }

  private _authBasicString() {
    return btoa(
      AUTH_LOGIN.basic
        .map(
          (
            basic: BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity
          ) => {
            return basic.value;
          }
        )
        .reverse()
        .join(':')
    );
  }
}
