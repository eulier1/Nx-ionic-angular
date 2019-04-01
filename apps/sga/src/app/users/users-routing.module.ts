import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'store',
    component: StoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
