import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listUsers: User[] = [];

  constructor( private userService: UsersService ) { }

  ngOnInit(): void {

    this.getUSers();

  }

  getUSers() {

    this.userService.getUsers()
        .subscribe( resp => {
          this.listUsers = resp;
        }),
        (error: any) => {
          console.log(error)
        }

  }

  deleteUSer( id: string | undefined) {

    this.userService.deleteUser( id )
        .subscribe( resp => {
          this.getUSers();
        }),
        (error: any) => {
          console.log(error)
        }
  }

}
