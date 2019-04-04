import { RolModel } from './Rol';

export namespace ACLModel {
  export interface ResponseUserRoles {
    data: Array<RolModel.Rol>;
    message: string;
    code;
  }

  export interface ResponseDeleteUserRol {
    data: boolean;
    message: string;
    code: number;
  }

  export interface ResponseRolPermissions {
    data: Array<any>;
    message: string;
    code;
  }

  export interface ResponseDeleteRolPermissions {
    data: boolean;
    message: string;
    code: number;
  }
}
