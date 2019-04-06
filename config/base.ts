import {
  API,
  HeaderEntity,
  Auth1,
  Body
} from './postman/Api.Team.postman_collection';
import { ServerPostmanEnvironment } from './postman/Server.postman_environment';
// @ts-ignore
import API_COLLECTION from './postman/Api.Team.postman_collection.json';
// @ts-ignore
import ENV_COLLECTION from './postman/Server.postman_environment.json';

const ENV: ServerPostmanEnvironment = ENV_COLLECTION;
const API_BASE: API = API_COLLECTION;

export const URL: string = ENV.values.find(value => value.key === 'url').value;

export const ACCESS_TOKEN: string = ENV.values.find(
  value => value.key === 'access_token'
).value;

export const PATH: string | any = (collection: string, requestName: string) =>
  URL +
  '/' +
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName)
    .request.url.path.join('/');

export const HEADERS: HeaderEntity[] | any = (
  collection: string,
  requestName: string
) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.header;

export const AUTH: Auth1 | any = (collection: string, requestName: string) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.auth;

export const BODY: Body | any = (collection: string, requestName: string) =>
  API_BASE.item
    .find(it => it.name === collection)
    .item.find(it => it.name === requestName).request.body;

export namespace AppInfo {
  export enum ClientSecretSGA {
    Username = 'krack-client-sga',
    Password = 'fGx4=yU-j4^jAAjZtV+YTDsm-@R$HAK3'
  }

  export enum ClientSecretAL {
    Username = 'krack-client-al',
    Password = 'k4a4yBrqW54L@uX_^p8EMGDFb?qj*TKe'
  }

  export enum Name {
    Sga = 'SGA',
    Al = 'AL'
  }
}
