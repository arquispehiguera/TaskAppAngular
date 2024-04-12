import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
{path:'Home',component:TodoComponent},
{path:'**',pathMatch:'full',redirectTo:'Home'}

];
