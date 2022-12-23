import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailsModel } from '../+store/models';

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
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('articleId')!;
    this.articleDetailsModel.loadArticle(id);
  }

  ngOnDestroy() {
    this.articleDetailsModel.handleDestroy();
  }
}
