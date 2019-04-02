export namespace RolModel {
  export interface Rol {
    id?: number;
    name: string;
  }
  export interface ResponseIndex {
    data: Rol[];
  }
  export interface ResponseStore {
    data: Rol;
    message: string;
    code: number;
  }

  export interface ResponseShow {
    data: Rol;
    message: string;
    code: number;
  }

  export interface ResponseUpdate {
    data: Rol;
    message: string;
    code: number;
  }

  export interface ResponseDestroy {
    data: number;
    message: string;
    code: number;
  }

  export interface ErrorResponseIndex {
    statusCode: number;
    status: number;
    code: number;
    message: string;
    name: string;
  }
}
