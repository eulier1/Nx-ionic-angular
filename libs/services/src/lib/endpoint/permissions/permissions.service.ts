import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { PATH_GET_SHOW_PERMISSIONS } from '../../../api/endpoints/Permissions';

import { ResponseShow } from '@suite/services';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../../../../../../apps/sga/src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getShow(): Promise<Observable<HttpResponse<ResponseShow[]>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<ResponseShow[]>(PATH_GET_SHOW_PERMISSIONS, {
      headers: headers,
      observe: 'response'
    });
  }
}
