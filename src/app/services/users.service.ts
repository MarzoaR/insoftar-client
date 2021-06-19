import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // url para pruebas en local
  // url = 'http://localhost:5000/api/users/';

  // url para pruebas desde heroku
  url = 'https://server-api-insoftar.herokuapp.com/api/users/'


  constructor( private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>( this.url );
  }

  deleteUser( id: string | undefined ): Observable<User> {
    return this.http.delete<User>( this.url + id )
  }

  appUser( user: User): Observable<User> {
    return this.http.post<User>( this.url, user );
  }

  updateUser( id: string, user: User): Observable<User> {
    return this.http.put<User>( this.url + id, user );
  }

  getUser( id: string | undefined): Observable<User> {
    return this.http.get<User>( this.url + id );
  }

  checkEmail( email: string ): Observable<boolean>{
    return this.http.get<boolean>( `${this.url}check-email/${email}` );
  }

  checkDni( dni: number ): Observable<boolean>{
    return this.http.get<boolean>( `${this.url}check-dni/${dni}` );
  }

}
