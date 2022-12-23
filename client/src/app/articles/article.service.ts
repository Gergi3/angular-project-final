import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IArticle, ILoadArticlesArgs } from '../core/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getAll(args: ILoadArticlesArgs) {
    let url = '/api/articles';
    if (args.profile) {
      url = url + '/profile';
    }
    return this.http.get<IArticle[]>(url);
  }

  getById(id: string) {
    return this.http.get<IArticle>('/api/articles/' + id);
  }

  getProfileArticles() {
    return this.http.get<IArticle>('/api/articles/profile');
  }
}
