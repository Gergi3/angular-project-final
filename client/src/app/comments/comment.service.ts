import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment } from '../core/interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  getComments(articleId: string) {
    return this.http.get<IComment[]>('/api/articles/' + articleId + '/comments');
  }

  createComment(articleId: string, text: string) {
    return this.http.post<IComment>('/api/articles/' + articleId + '/comments', { text });
  }
}
