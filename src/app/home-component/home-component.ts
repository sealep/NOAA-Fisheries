import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService, Region } from '../data-service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

  regions$: Observable<Region[]>;
  
  constructor(private dataService: DataService) {
    this.regions$ = this.dataService.regions$.pipe(
      map(regions => Array.from(regions.values( ))));
   }
}
