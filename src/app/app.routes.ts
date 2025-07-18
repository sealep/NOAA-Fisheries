import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { RegionComponent } from './region-component/region-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'region/:id', component: RegionComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];