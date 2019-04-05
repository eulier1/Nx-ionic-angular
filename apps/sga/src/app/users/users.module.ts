import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatTableModule, MatCheckboxModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreComponent } from './store/store.component';
import { UpdateComponent } from './update/update.component';
import { CommonUiCrudModule } from '@suite/common/ui/crud';

@NgModule({
  declarations: [UsersComponent, StoreComponent, UpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MatTableModule,
    MatCheckboxModule,
    UsersRoutingModule,
    CommonUiCrudModule,
    CdkTableModule
  ]
})
export class UsersModule {}
