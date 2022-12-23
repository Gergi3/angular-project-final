import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleListModel } from '../+store/models';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss']
})
export class MyArticlesComponent implements OnDestroy, OnInit {
  articles$ = this.articleListModel.articles$;
  isLoading$ = this.articleListModel.isLoading$;

  constructor(
    private articleListModel: ArticleListModel
  ) { }

  ngOnInit() {
    this.articleListModel.loadArticles({ profile: true });
  }

  ngOnDestroy() {
    this.articleListModel.handleDestroy();
  }
}
