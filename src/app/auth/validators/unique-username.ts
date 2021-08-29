import { AsyncValidator, ValidationErrors, FormControl} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';


@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService){

    }

    validate  = (control: FormControl): Observable<ValidationErrors> => {
       const { value } = control;
    
       return this.authService.usernameAvailable(value)
        .pipe(
            map((value) => {
                return null;   
            }),
            catchError((err)=>{
                if(err.error.username) {
                    return of({
                        nonUniqueUsername: true
                    })
                } else {
                    return of({
                        noConnection: true
                    })
                }
                
            })
        );
     
    };


    
}
