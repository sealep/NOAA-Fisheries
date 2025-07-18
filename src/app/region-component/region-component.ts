import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Region } from '../data-service';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-region-component',
  imports: [CommonModule],
  templateUrl: './region-component.html',
  styleUrl: './region-component.css'
})
export class RegionComponent  {

  region$: Observable<Region | undefined>;
  
  // To do: gracefully handle an undefined Region (e.g., one is typed in the URL)
  constructor (private route: ActivatedRoute, private dataService: DataService) {
    this.region$ = combineLatest([this.route.paramMap, this.dataService.regions$]).pipe(
      map(([paramMap, regionMap]) => {
        let region: Region | undefined = undefined;
        const regionName = paramMap.get('id');
        if (regionName) {
          region = regionMap.get(regionName);
        }
        return region;
      })
    );
  }
    
}