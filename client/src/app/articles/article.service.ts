import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IArticle } from '../core/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IArticle[]>('/api/articles');
  }

  getById(id: string) {
    return this.http.get<IArticle>('/api/articles/' + id);
  }
}
