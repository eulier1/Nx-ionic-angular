import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2Service } from './endpoint/oauth2/oauth2.service';

@NgModule({
  imports: [CommonModule],
  providers: [Oauth2Service]
})
export class ServicesModule {}
