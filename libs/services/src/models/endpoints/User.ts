export namespace UserModel {
  export interface User {
    id?: number;
    email?: string;
    name: string;
  }
  export interface ResponseIndex {
    data: User[];
  }

  export interface ResponseShow {
    data: [
      {
        id: number;
        email: string;
        name: string;
      }
    ];
  }

  export interface ErrorResponseIndex {
    statusCode: number;
    status: number;
    code: number;
    message: string;
    name: string;
  }
}
