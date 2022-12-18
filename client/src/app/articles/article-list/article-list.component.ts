import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { articleListActions } from '../+store/actions';
import { articleListSelectors } from '../+store/selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles$ = this.store.select(articleListSelectors.articleList);

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(articleListActions.loadArticles());
  }
}
