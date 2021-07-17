// Angular
import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
})
export class CareersComponent {
  goToJobOpenings() {
    document
      .getElementById('jobOpenings')
      .scrollIntoView({ behavior: 'smooth' });
  }
}
