import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Email, EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService  implements Resolve<Email> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    
    return this.emailService.getEmail(id).pipe(
      catchError(()=> {
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY;
      })
    );
  }

  constructor(private emailService: EmailService, private router: Router) { }
}
