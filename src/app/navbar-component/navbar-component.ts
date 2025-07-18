import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../data-service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {

  regionNames$: Observable<string[]>;
  
  constructor(private dataService: DataService) {
    this.regionNames$ = this.dataService.regions$.pipe(
      map(regions => Array.from(regions.keys( ))));
   }

}