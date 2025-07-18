import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';

export type Fish = {
  name: string,
  imageUrl: string,
  calories: string,
  fat: string,
  description: string
}

export type Region = {
  name: string,
  avgCalories: string,
  avgFat: string,
  fishes: Fish[]
}

type RawFish = {
  NOAAFisheriesRegion: string,
  SpeciesName: string,
  Calories: string,
  FatTotal: string,
  SpeciesIllustrationPhoto: { src: string },
  PhysicalDescription: string
}

@Injectable({
  providedIn: 'root',
  
})
export class DataService {
  
  private itemsUrl = 'http://localhost:5001/gofish?apikey=abrradiology';
  regions$: Observable<Map<string, Region>>;

  constructor(private http: HttpClient) {
    this.regions$ = this.http.get<RawFish[]>(this.itemsUrl).pipe(
      map(this.cookFish),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private cookFish(json: RawFish[]): Map<string, Region> {
    const rawRegions = Object.groupBy(json ?? [], ({ NOAAFisheriesRegion }) => NOAAFisheriesRegion);
    return new Map(
      Object.entries(rawRegions).map(([regionName, rawFishes]) => {
        let totalCalories = 0, totalFat = 0;
        let calorieCnt = 0, fatCnt = 0;
        rawFishes ??= [];
        const fishes: Fish[] = rawFishes.map((rawFish: RawFish) => {
          const calories = parseFloat(rawFish.Calories);
          if (!Number.isNaN(calories)) {
            totalCalories += calories;
            calorieCnt++;
          }
          const fat = parseFloat(rawFish.FatTotal);
          if (!Number.isNaN(fat)) {
            totalFat += fat;
            fatCnt++;
          }   
          return {
            name: rawFish.SpeciesName,
            imageUrl: rawFish.SpeciesIllustrationPhoto.src,
            calories: Number.isNaN(calories) ? 'unknown' : rawFish.Calories,
            fat: Number.isNaN(fat) ? 'unknown' : rawFish.FatTotal,
            description: rawFish.PhysicalDescription
          }
        });
        return [regionName, {
          name: regionName,
          avgCalories: calorieCnt > 0 ? `${(totalCalories / calorieCnt).toFixed(2) }` : 'N/A',
          avgFat: fatCnt > 0 ? `${(totalFat / fatCnt).toFixed(2) } g` : 'N/A',
          fishes
        }];
      }));
    }
    
  }