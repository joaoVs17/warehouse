import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '', title: 'Welcome', component: LandingLayoutComponent, children: [
        {path: 'signin', title: 'Sign In', component: SigninFormComponent},
        {path: 'signup', title: 'Sign Up', component: SignupFormComponent},
    ]},
    {path: 'home', title: 'Home', component: HomeLayoutComponent, children: [
        {path: '', title: 'Home', component: HomeComponent}
    ]},
    {path: 'home/my_files', title: 'My Files', component: HomeLayoutComponent},
    {path: 'home/shared_with_me', title: 'Shared With Me', component: HomeLayoutComponent},
    {path: 'home/recent', title: 'Recent', component: HomeLayoutComponent},
    {path: 'home/starred', title: 'Starred', component: HomeLayoutComponent},
    {path: 'home/trash', title: 'Trash', component: HomeLayoutComponent},
    {path: 'home/folders', title: 'Folder', component: HomeLayoutComponent},
];
