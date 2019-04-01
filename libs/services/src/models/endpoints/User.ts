export namespace UserModel {
  export interface ResponseIndex {
    data: [
      {
        id: number;
        email: string;
        name: string;
      }
    ];
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
