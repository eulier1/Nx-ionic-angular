import { PATH, HEADERS, AUTH, ACCESS_TOKEN } from "../base"
import { Auth1 } from "../../../models/Api.Team.postman_collection"

export const HEADERS_LOGIN: any[] = HEADERS("OAuth2", "Login")
export const AUTH_LOGIN: Auth1 = AUTH("OAuth2", "Login")
export const PATH_POST_LOGIN: string = PATH("OAuth2", "Login")

export const AUTH_LOGOUT: Auth1 = AUTH("OAuth2", "Logout")
export const PATH_GET_LOGOUT: string = PATH("OAuth2", "Logout")
export const ACCESS_TOKEN_LOGOUT = ACCESS_TOKEN
