import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { StoreComponent } from './store/store.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
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
    component: UsersComponent
  },
  {
    path: 'menu',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
