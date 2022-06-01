import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpcreateComponent } from './components/empcreate/empcreate.component';
import { EmpeditComponent } from './components/empedit/empedit.component';
import { EmplistComponent } from './components/emplist/emplist.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:'employee-create'},
  {path:"employee-create", component:EmpcreateComponent},
  {path:"edit-employee/:id", component:EmpeditComponent},
  {path:"employee-list", component:EmplistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
