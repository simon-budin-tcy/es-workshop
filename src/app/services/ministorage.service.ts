import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MiniStorageService {
  constructor() {}

  idQuery: string = '';
  textQuery: string = 'hoop';
  searchType: string = 'match';
  analyzerName: string = 'standard';
  analyzedText: string = 'HOOP EARRINGS & fraises surgelées';
}
