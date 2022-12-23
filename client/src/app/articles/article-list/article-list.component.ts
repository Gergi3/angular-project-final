import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { IArticle } from 'src/app/core/interfaces/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  @Input() articles$!: Observable<IArticle[] | null>;
  @Input() isLoading$!: Observable<boolean>;
  @Input() pageTitle: string = 'Articles';
}
