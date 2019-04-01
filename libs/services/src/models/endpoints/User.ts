export namespace UserModel {
  export interface User {
    id?: number;
    email?: string;
    name: string;
    password?: string;
  }
  export interface ResponseIndex {
    data: User[];
  }
  export interface ResponseStore {
    data: {
      id: number;
      email: string;
      name: string;
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
