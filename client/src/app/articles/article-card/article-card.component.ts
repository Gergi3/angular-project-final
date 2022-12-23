import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/core/interfaces/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article!: IArticle;

  defaultImageUrl = `/assets/placeholder-600x400.webp`;

  get cardImageStyle() {
    return `background-image: url("${this.article.imageUrl || this.defaultImageUrl}")`
  }
}
