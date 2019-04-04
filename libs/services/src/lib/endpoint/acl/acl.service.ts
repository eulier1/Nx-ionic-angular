import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { ACLModel } from '../../../models/endpoints/ACL';
import { URL } from '../../../../../../config/base';

const PATH_BASE: string = URL + '/api/';

@Injectable({
  providedIn: 'root'
})
export class AclService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getUserRoles(
    userId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseUserRoles>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<ACLModel.ResponseUserRoles>(
      `${PATH_BASE}users/${userId}/roles`,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }

  async getRolPermissions(
    rolId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseUserRoles>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<ACLModel.ResponseUserRoles>(
      `${PATH_BASE}roles/${rolId}/permissions`,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }
}
