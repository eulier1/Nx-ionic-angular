export namespace RolModel {
  export interface Rol {
    id?: number;
    name: string;
    sga_allowed?: true;
    app_allowed?: true;
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

  export interface ResponseAssign {
    data: {
      id?: number;
      email: string;
      name: string;
      password: string;
      salt: string;
      resetPasswordToken: null;
      __roles__: [
        {
          id: number;
          name: string;
        }
      ];
      __has_roles__: boolean;
    };
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
