import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../authentication/authentication.service';

import { RolModel } from '../../../models/endpoints/Rol';
import { PATH, URL } from '../../../../../../config/base';
import { concat } from 'rxjs';
import { ACLModel } from '@suite/services';

const PATH_GET_INDEX: string = PATH('Roles', 'Index');
const PATH_POST_STORE: string = PATH('Roles', 'Store');
const PATH_GET_SHOW: string = PATH('Roles', 'Show').slice(0, -1);
const PATH_PUT_UPDATE: string = PATH('Roles', 'Update').slice(0, -1);
const PATH_DEL_DESTROY: string = PATH('Roles', 'Destroy').slice(0, -1);
const PATH_BASE: string = URL + '/api/';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  async getIndex(): Promise<Observable<HttpResponse<RolModel.ResponseIndex>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<RolModel.ResponseIndex>(PATH_GET_INDEX, {
      headers: headers,
      observe: 'response'
    });
  }

  async postStore(
    rol: RolModel.Rol
  ): Promise<Observable<HttpResponse<RolModel.ResponseStore>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.post<RolModel.ResponseStore>(PATH_POST_STORE, rol, {
      headers: headers,
      observe: 'response'
    });
  }

  async getShow(
    userId: string | number
  ): Promise<Observable<HttpResponse<RolModel.ResponseShow>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.get<RolModel.ResponseShow>(`${PATH_GET_SHOW}${userId}`, {
      headers: headers,
      observe: 'response'
    });
  }

  async putUpdate(
    rol: RolModel.Rol
  ): Promise<Observable<HttpResponse<RolModel.ResponseUpdate>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.put<RolModel.ResponseUpdate>(
      `${PATH_PUT_UPDATE}${rol.id}`,
      rol,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }

  async deleteDestroy(
    users: RolModel.Rol[]
  ): Promise<Observable<HttpResponse<RolModel.ResponseDestroy>>[]> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });

    return users.map(rol => {
      return concat(
        this.http.delete<RolModel.ResponseDestroy>(
          `${PATH_DEL_DESTROY}${rol.id}`,
          {
            headers: headers,
            observe: 'response'
          }
        )
      );
    });
  }

  async postAssignRolToUser(
    userId: number,
    rolId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseUserRoles>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.post<ACLModel.ResponseUserRoles>(
      `${PATH_BASE}users/${userId}/roles/${rolId}`,
      {},
      {
        headers: headers,
        observe: 'response'
      }
    );
  }

  async deleteRolToUser(
    userId: number,
    rolId: number
  ): Promise<Observable<HttpResponse<ACLModel.ResponseDeleteUserRol>>> {
    const currentToken = await this.auth.getCurrentToken();
    const headers = new HttpHeaders({ Authorization: currentToken });
    return this.http.delete<ACLModel.ResponseDeleteUserRol>(
      `${PATH_BASE}users/${userId}/roles/${rolId}`,
      {
        headers: headers,
        observe: 'response'
      }
    );
  }
}
