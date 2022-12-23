import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleListModel } from '../+store/models';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnDestroy, OnInit {
  articles$ = this.articleListModel.articles$;
  isLoading$ = this.articleListModel.isLoading$;

  constructor(
    private articleListModel: ArticleListModel
  ) { }

  ngOnInit() {
    this.articleListModel.loadArticles();
  }

  ngOnDestroy() {
    this.articleListModel.handleDestroy();
  }
}
