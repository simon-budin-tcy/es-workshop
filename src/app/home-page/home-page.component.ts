import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { EsCallService } from '../services/esCall/es-call.service';
import { simplifiedResult } from '../services/esCall/esCallResultModel';
import { MiniStorageService } from '../services/ministorage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    Highlight,
    HighlightLineNumbers,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    InputGroupAddonModule,
    RadioButtonModule,
    RatingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TableModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    private http: HttpClient,
    private esCallService: EsCallService,
    private miniStorageService: MiniStorageService
  ) {
    console.log('hey');
    this.query = miniStorageService.textQuery;
    this.idQuery = miniStorageService.idQuery;
    this.searchType = miniStorageService.searchType;
  }
  query = '';
  idQuery = '';
  results: Array<any> = [];
  searchType = 'match';

  ngOnInit() {
    this.searchHandler();
  }
  ngOnDestroy() {
    this.miniStorageService.textQuery = this.query;
    this.miniStorageService.idQuery = this.idQuery;
    this.miniStorageService.searchType = this.searchType;
  }
  searchHandler() {
    this.idQuery = '';
    this.miniStorageService.idQuery = '';
    this.esCallService
      .queryAll(this.query.trim(), this.searchType)
      .subscribe((res: Array<simplifiedResult>) => {
        this.results = res;
      });
  }
  searchIdHandler() {
    this.query = '';
    this.miniStorageService.textQuery = '';
    this.esCallService
      .queryAll(this.idQuery.trim(), 'id')
      .subscribe((res: Array<simplifiedResult>) => {
        this.results = res;
      });
  }
}
