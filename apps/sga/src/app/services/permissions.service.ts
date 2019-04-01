import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { PATH_GET_SHOW } from '../../../../../shared_modules/services/api/endpoints/Permissions';

import { ResponseShow } from '../../../../../shared_modules/models/endpoints/Permissions';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getShow(): Promise<Observable<HttpResponse<ResponseShow[]>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<ResponseShow[]>(PATH_GET_SHOW, {
      headers: headers,
      observe: 'response'
    });
  }
}
