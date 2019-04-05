import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatTableModule, MatCheckboxModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MatTableModule,
    MatCheckboxModule,
    CdkTableModule,
    RouterModule.forChild([{ path: '', component: ListComponent }])
  ],
  exports: [ListComponent],
  declarations: [ListComponent]
})
export class CommonUiCrudModule {}
