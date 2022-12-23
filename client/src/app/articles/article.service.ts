import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IArticle, ICreateArticlesArgs, IEditArticlesArgs, ILoadArticlesArgs } from '../core/interfaces/article';

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

  create(args: ICreateArticlesArgs) {
    return this.http.post<IArticle>('/api/articles', args);
  }

  edit(args: IEditArticlesArgs) {
    return this.http.put<IArticle>('/api/articles/' + args.articleId, args);
  }

  delete(articleId: string) {
    return this.http.delete<IArticle>('/api/articles/' + articleId);
  }
}
