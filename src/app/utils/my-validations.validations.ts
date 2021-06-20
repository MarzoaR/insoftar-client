import { AbstractControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export class MyValidations {

  static existsEmail( userService: UsersService, email?: string | undefined ){
    return ( control: AbstractControl ) => {
      const value = control.value;
      if( email !== value) {
        return userService.checkEmail( value )
                .pipe(
                  map( resp => {
                    return resp ? null: { notAvaible: true }
                  })
                )
      }else{
        return of()
                .pipe(
                  map( resp => {
                        return null;
                      })
                )
      }
    }
  }
  static existsDni( userService: UsersService,  dni?: number | undefined ){
    return ( control: AbstractControl ) => {
      const value = control.value;
      if( dni !== value) {
        return userService.checkDni( value )
                .pipe(
                  map( resp => {
                    return resp ? null: { notAvaible: true }
                  })
                )
      }else{
        return of()
                .pipe(
                  map( resp => {
                        return null;
                      })
                )
      }
    }
  }
}