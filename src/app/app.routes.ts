import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { LoginGuardService } from './services/login-guard/login-guard.service';
import { MyFilesComponent } from './pages/my-files/my-files.component';

export const routes: Routes = [
    {path: '', title: 'Welcome', component: LandingLayoutComponent, canActivate: [LoginGuardService], children: [
        {path: 'signin', title: 'Sign In', component: SigninFormComponent, canActivate: [LoginGuardService]},
        {path: 'signup', title: 'Sign Up', component: SignupFormComponent, canActivate: [LoginGuardService]},
        {path: 'confirm_email/:token', title: 'Confirm Email', component: ConfirmEmailComponent, canActivate: [LoginGuardService]},
    ]},
    {path: 'home', title: 'Home', component: HomeLayoutComponent, canActivate: [AuthGuardService], children: [
        {path: '', title: 'Home', component: HomeComponent, canActivate: [AuthGuardService]},
        {path: 'my_files', title: 'My Files', canActivate: [AuthGuardService], children: [
            {path: '', title: 'My Files', component: MyFilesComponent, canActivate: [AuthGuardService]},
            {path: 'folders/:folder_id', title: 'My Files', component: MyFilesComponent, canActivate: [AuthGuardService]}
        ]},
    ]},
    {path: 'home/shared_with_me', title: 'Shared With Me', component: HomeLayoutComponent},
    {path: 'home/recent', title: 'Recent', component: HomeLayoutComponent},
    {path: 'home/starred', title: 'Starred', component: HomeLayoutComponent},
    {path: 'home/trash', title: 'Trash', component: HomeLayoutComponent},
    {path: 'home/folders', title: 'Folder', component: HomeLayoutComponent},
];
