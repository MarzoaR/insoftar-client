import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';

const routes: Routes = [
  { path: '', component: ListUserComponent},
  { path: 'formUser', component: FormUserComponent},
  { path: 'editUser/:id', component: FormUserComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
