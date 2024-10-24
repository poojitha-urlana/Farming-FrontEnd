import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidenavbarAdminComponent } from './sidenavbar-admin/sidenavbar-admin.component';
import { SidenavbarUserComponent } from './sidenavbar-user/sidenavbar-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { FarmmanagementComponent } from './farmmanagement/farmmanagement.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DashBoardUserComponent } from './dash-board-user/dash-board-user.component';
import { DashBoardAdminComponent } from './dash-board-admin/dash-board-admin.component';
import { UserFarmListComponent } from './user-farm-list/user-farm-list.component';
import { FarmsComponent } from './farms/farms.component';
import { CropHealthComponent } from './crop-health/crop-health.component';
import { EditFarmComponent } from './edit-farm/edit-farm.component';
import { AddFarmComponent } from './add-farm/add-farm.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'login-user', component: LoginUserComponent },
    { path: 'login-admin', component: LoginAdminComponent },
    { path: 'register-user', component: RegisterUserComponent },
    { path: 'dash-board-user', component: DashBoardUserComponent },
    { path: 'dash-board-admin', component: DashBoardAdminComponent },
    { path: 'sidenavbar-admin', component: SidenavbarAdminComponent },
    { path: 'sidenavbar-user', component: SidenavbarUserComponent},
    { path: 'user-management', component: UserManagementComponent },
    { path: 'farmmanagement', component: FarmmanagementComponent },
    { path: 'user-farm-list', component: UserFarmListComponent },
    { path: 'farms', component: FarmsComponent },
    { path: 'farms/:id', component: FarmsComponent },
    { path: 'crop-health', component: CropHealthComponent },
    {path: 'edit-farm/:id', component: EditFarmComponent}, 
    { path: 'add-farm', component: AddFarmComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }, // Catch-all for unknown routes
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }