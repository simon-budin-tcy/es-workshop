import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { EsCallService } from '../services/esCall/es-call.service';
import { MiniStorageService } from '../services/ministorage.service';

interface Analyzer {
  name: string;
  code: string;
}
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    ButtonModule,
    ChipModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {
  tokens: Array<string> = [];
  analyzers: Array<any> = [];
  formGroup: FormGroup | undefined;
  analyzerName = '';
  analyzedText = '';

  constructor(
    private http: HttpClient,
    private esCallService: EsCallService,

    private miniStorageService: MiniStorageService
  ) {
    this.analyzerName = miniStorageService.analyzerName;
    this.analyzedText = miniStorageService.analyzedText;
  }

  ngOnInit() {
    this.analyzers = [
      { name: 'Keyword', code: 'keyword' },
      { name: 'Standard', code: 'standard' },
      { name: 'Lowercase + asciifolding', code: 'lowercase_ascii' },
      {
        name: 'Lowercase + asciifolding + ngram_3_7',
        code: 'lowercase_ascii_ngram',
      },
      {
        name: 'Lowercase + asciifolding + edge_ngram_1_12',
        code: 'lowercase_ascii_edge_ngram',
      },
    ];
    this.formGroup = new FormGroup({
      selectedAnalyzer: new FormControl<Analyzer | null>(
        this.analyzerName as any
      ),
      analyzedText: new FormControl<String>(this.analyzedText),
    });
    this.formGroup.valueChanges.subscribe((ev) => {
      this.analyze(ev.selectedAnalyzer, ev.analyzedText);
      this.miniStorageService.analyzerName = ev.selectedAnalyzer;
      this.miniStorageService.analyzedText = ev.analyzedText;
    });
    this.analyze(this.analyzerName, this.analyzedText);
  }
  analyze(analyzerName: string, analyzedText: string) {
    this.esCallService
      .analyze(analyzerName, analyzedText)
      .subscribe((tokens: Array<string>) => {
        this.tokens = tokens;
      });
  }
}
