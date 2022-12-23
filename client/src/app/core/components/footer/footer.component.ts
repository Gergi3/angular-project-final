import { Component } from '@angular/core';

import { faLinkedin, faSquareFacebook, faSquareTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  icons = [
    { link: 'https://www.facebook.com/', ref: faSquareFacebook },
    { link: 'https://twitter.com/', ref: faSquareTwitter },
    { link: 'https://www.linkedin.com/', ref: faLinkedin },
    { link: 'https://www.youtube.com/', ref: faYoutube },
    { link: 'https://www.tiktok.com/', ref: faTiktok }
  ];
}
