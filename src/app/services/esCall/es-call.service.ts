import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { baseESUrl, indexName } from '../../constants';
import {
  esAnalysisResult,
  esCallResultHit,
  esCallResultModel,
  simplifiedResult,
} from './esCallResultModel';

@Injectable({
  providedIn: 'root',
})
export class EsCallService {
  private allResults = [];

  constructor(private http: HttpClient) {}

  queryAll(
    query: string,
    searchType: string
  ): Observable<Array<simplifiedResult>> {
    // const
    let search$ = new Observable();
    switch (searchType) {
      case 'match':
        search$ = this.matchSearch(query);
        break;
      case 'term':
        search$ = this.termSearch(query);
        break;
      case 'wildcard':
        search$ = this.wildcardSearch(`*${query}*`);
        break;
      case 'queryString':
        search$ = this.queryStringSearch(query);
        break;
      case 'match-fuzzy':
        search$ = this.matchFuzzy(query);
        break;
      case 'id':
        search$ = this.termIdSearch(query);
        break;
    }
    const obs2$ = combineLatest({
      all: this.rawCall({}),
      search: search$ as Observable<esCallResultModel>,
    }).pipe(
      map((combined) => {
        const out: Array<simplifiedResult> = [];
        (combined.search as esCallResultModel).hits.hits.forEach((hit: any) => {
          const matchingHit: esCallResultHit | undefined = (
            combined.all as esCallResultModel
          ).hits.hits.find(
            (t: esCallResultHit) => t._source.title === hit._source.title
          );
          if (!matchingHit) return;

          const simplified = {
            id: matchingHit._source.id,
            title: matchingHit._source.title,
            isTitleGreen: true,
            isIdGreen: false,
            score: hit._score,
          } as simplifiedResult;
          if (query === matchingHit._source.id) {
            simplified.isTitleGreen = false;
            simplified.isIdGreen = true;
          }
          out.push(simplified);
        });
        combined.all.hits.hits.forEach((hit) => {
          const matchingHit = combined.search.hits.hits.find(
            (h: any) => h._source.title === hit._source.title
          );
          if (!matchingHit) {
            const simplified = {
              id: hit._source.id,
              title: hit._source.title,
              isTitleGreen: false,
              score: 'n/a',
            } as simplifiedResult;
            out.push(simplified);
          }
        });
        return out;
      })
    );
    return obs2$;
  }

  analyze(
    analyzerName: string,
    analyzedValue: string
  ): Observable<Array<string>> {
    return this.rawAnalysisCall(analyzerName, analyzedValue).pipe(
      map((result: esAnalysisResult) => {
        return result.tokens.map((t) => t.token);
      })
    );
  }

  private matchSearch(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            match: {
              title: searchQuery,
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }
  private termSearch(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            term: {
              title: searchQuery,
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }
  private termIdSearch(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            term: {
              id: searchQuery,
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }
  private wildcardSearch(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            wildcard: {
              title: {
                value: searchQuery,
              },
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }
  private queryStringSearch(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            query_string: {
              query: searchQuery,
              analyze_wildcard: true,
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }
  private matchFuzzy(searchQuery: string) {
    let queryObj = searchQuery
      ? {
          query: {
            match: {
              title: {
                query: searchQuery,
                fuzziness: 'AUTO',
              },
            },
          },
          sort: ['_score'],
        }
      : {};
    return this.rawCall(queryObj);
  }

  private rawCall(queryObj: any): Observable<esCallResultModel> {
    return this.http.post<esCallResultModel>(
      `${baseESUrl}/${indexName}/_search`,
      queryObj
    );
  }
  private rawAnalysisCall(
    analyzerName: string,
    analyzedValue: string
  ): Observable<esAnalysisResult> {
    return this.http.post<esAnalysisResult>(
      `${baseESUrl}/${indexName}/_analyze`,
      {
        text: analyzedValue,
        analyzer: analyzerName,
      }
    );
  }
}
