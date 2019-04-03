import { RolModel } from './Rol';

export namespace ACLModel {
  export interface ResponseUserRoles {
    data: Array<RolModel.Rol>;
    message: string;
    code;
  }
}
