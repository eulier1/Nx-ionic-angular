export interface API {
  info: Info
  item?: (ItemEntity)[] | null
  auth: Auth
  event?: (EventEntity)[] | null
}
export interface Info {
  _postman_id: string
  name: string
  schema: string
}
export interface ItemEntity {
  name: string
  item?: (ItemEntity1)[] | null
  event?: (EventEntity)[] | null
}
export interface ItemEntity1 {
  name: string
  request: Request
  response?: (null)[] | null
  protocolProfileBehavior?: ProtocolProfileBehavior | null
  event?: (EventEntity)[] | null
}
export interface Request {
  auth?: Auth1 | null
  method: string
  header?: (HeaderEntity | null)[] | null
  body: Body
  url: Url
}
export interface Auth1 {
  type: string
  bearer?: (BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity)[] | null
  basic?: (BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity)[] | null
  oauth2?: (BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity)[] | null
}
export interface BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity {
  key: string
  value: string
  type: string
}
export interface HeaderEntity {
  key: string
  name: string
  value: string
  type: string
}
export interface Body {
  mode: string
  urlencoded?:
    | (BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity)[]
    | null
  raw?: string | null
}
export interface Url {
  raw: string
  host?: (string)[] | null
  path?: (string)[] | null
}
export interface ProtocolProfileBehavior {
  disableBodyPruning: boolean
}
export interface EventEntity {
  listen: string
  script: Script
}
export interface Script {
  id: string
  exec?: (string)[] | null
  type: string
}
export interface Auth {
  type: string
  oauth2?: (BearerEntityOrBasicEntityOrUrlencodedEntityOrOauth2Entity)[] | null
}
