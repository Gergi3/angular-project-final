import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/core/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: IArticle;
}
