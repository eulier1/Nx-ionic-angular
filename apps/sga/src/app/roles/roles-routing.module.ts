import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { StoreComponent } from './store/store.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'store/:id',
    component: UpdateComponent
  },
  {
    path: 'list',
    component: RolesComponent
  },
  {
    path: 'menu',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
