import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { PermissionsModel } from '../../../models/endpoints/Permissions';
import { ACLModel } from '../../../models/endpoints/ACL';

import { PATH, URL } from '../../../../../../config/base';

const PATH_GET_INDEX: string = PATH('Permissions', 'Index');
const PATH_GET_SHOW: string = PATH('Permissions', 'Show');

const PATH_BASE: string = URL + '/api/';
@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getIndex(): Promise<
    Observable<HttpResponse<PermissionsModel.ResponseIndex>>
  > {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<PermissionsModel.ResponseIndex>(PATH_GET_INDEX, {
      headers: headers,
      observe: 'response'
    });
  }

  async getShow(): Promise<
    Observable<HttpResponse<PermissionsModel.ResponseShow[]>>
  > {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<PermissionsModel.ResponseShow[]>(PATH_GET_SHOW, {
      headers: headers,
      observe: 'response'
    });
  }

  async postAssignPermissionToRol(
    rolId: number,
    permissionId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseRolPermissions>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.post<ACLModel.ResponseRolPermissions>(
      `${PATH_BASE}roles/${rolId}/permissions/${permissionId}`,
      {},
      {
        headers: headers,
        observe: 'response'
      }
    );
  }

  async deletePermissionToRol(
    rolId: number,
    permissionId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseDeleteRolPermissions>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.delete<ACLModel.ResponseDeleteRolPermissions>(
      `${PATH_BASE}roles/${rolId}/permissions/${permissionId}`,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }
}
