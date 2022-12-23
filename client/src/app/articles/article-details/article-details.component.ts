import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleDetailsModel } from '../+store/models';
import { first } from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  article$ = this.articleDetailsModel.article$;
  isLoading$ = this.articleDetailsModel.isLoading$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleDetailsModel: ArticleDetailsModel,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('articleId')!;
    this.articleDetailsModel.loadArticle(id);
    this.articleDetailsModel.loadArticleFailure$.pipe(first())
      .subscribe(() => this.router.navigateByUrl('/404', { skipLocationChange: true }));
  }

  ngOnDestroy() {
    this.articleDetailsModel.handleDestroy();
  }
}
