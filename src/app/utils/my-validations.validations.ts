import { AbstractControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';

export class MyValidations {

  static existsEmail( userService: UsersService ){
    return ( control: AbstractControl ) => {
      const value = control.value;
      return userService.checkEmail( value )
              .pipe(
                map( resp => {
                  return resp ? null: { notAvaible: true }
                })
              )
    }
  }
  static existsDni( userService: UsersService ){
    return ( control: AbstractControl ) => {
      const value = control.value;
      return userService.checkDni( value )
              .pipe(
                map( resp => {
                  return resp ? null: { notAvaible: true }
                })
              )
    }
  }
}