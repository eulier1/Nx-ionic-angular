import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolToUserComponent } from './rol-to-user/rol-to-user/rol-to-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/assign/rol/user', pathMatch: 'full' },
  { path: 'rol/user', component: RolToUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignRoutingModule {}
