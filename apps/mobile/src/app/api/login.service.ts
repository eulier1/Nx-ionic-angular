import { Injectable } from '@angular/core';

import { APITeamPostmanCollection } from '../../../../../share_modules/models/Api.Team.postman_collection';
import { ServerPostmanEnvironment } from '../../../../../share_modules/models/Server.postman_environment';
import * as API from '../../../../../share_modules/services/api/Api.Team.postman_collection.json';
import * as ENV from '../../../../../share_modules/services/api/Server.postman_environment.json';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API: APITeamPostmanCollection;
  ENV: ServerPostmanEnvironment;

  constructor() {
    this.API = API;
    this.ENV = ENV;
  }

  getAPI() {
    console.log(this.API);
    console.log(this.ENV);
  }
}
