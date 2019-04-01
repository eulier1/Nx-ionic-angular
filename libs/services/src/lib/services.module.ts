import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2Service } from './endpoint/oauth2/oauth2.service';
import { PermissionsService } from './endpoint/permissions/permissions.service';

@NgModule({
  imports: [CommonModule],
  providers: [Oauth2Service, PermissionsService]
})
export class ServicesModule {}
