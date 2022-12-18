import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleListModel } from '../+store/models';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnDestroy {
  articles$ = this.articleListModel.articles$;
  isLoading$ = this.articleListModel.isLoading$;

  constructor(private articleListModel: ArticleListModel) {
    this.articleListModel.loadArticles()
  }

  ngOnDestroy() {
    this.articleListModel.handleDestroy()
  }
}
