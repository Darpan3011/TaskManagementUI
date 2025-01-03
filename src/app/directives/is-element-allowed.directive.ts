import { Directive, ElementRef, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Directive({
  selector: '[appIsElementAllowed]'
})
export class IsElementAllowedDirective {

  private authService = inject(AuthServiceService);
  private currElement = inject(ElementRef);

  constructor() {
    const isNotAllowed = this.authService._userType() != 'Admin';
    if (isNotAllowed) {
      this.currElement.nativeElement.style.display = 'none';
    } else {
      this.currElement.nativeElement.style.display = 'block';
    }
  }
}