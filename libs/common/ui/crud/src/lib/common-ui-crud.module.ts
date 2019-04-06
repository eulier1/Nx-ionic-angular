import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatTableModule, MatCheckboxModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ListComponent } from './list/list.component';
import { StoreComponent } from './list/store/store.component';
import { UpdateComponent } from './list/update/update.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    CdkTableModule,
    RouterModule.forChild([{ path: '', component: ListComponent }])
  ],
  exports: [ListComponent, StoreComponent, UpdateComponent],
  declarations: [ListComponent, StoreComponent, UpdateComponent]
})
export class CommonUiCrudModule {}
