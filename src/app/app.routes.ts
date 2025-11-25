import { Routes } from '@angular/router';

import { AnalysisComponent } from './analysis/analysis.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: 'analysis', component: AnalysisComponent },
  { path: '', component: HomePageComponent },
];
