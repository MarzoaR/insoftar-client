import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

import { MyValidations } from '../../utils/my-validations.validations';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  isEdit: boolean = false;

  title: string = 'Add User';

  id: string | null;

  userForm: FormGroup;

  constructor(  private activatedRoute: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private userService: UsersService ) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,9}$/)], MyValidations.existsDni(this.userService)],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,}$/)]],
      email: ['', [Validators.required, Validators.email], MyValidations.existsEmail(this.userService)]
    })
  }

  ngOnInit(): void {
    this.editForm();
  }

  editForm(){

    if( this.id !== null ) {
      this.title = 'Edit User';
      this.userService.getUser( this.id )
          .subscribe( resp => {
            this.userForm = this.fb.group({
              name: [resp.name, [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]],
              lastname: [resp.lastname, [Validators.required, Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]],
              dni: [resp.dni, [Validators.required, Validators.pattern(/^[0-9]{7,9}$/)], MyValidations.existsDni(this.userService, resp.dni)],
              phone: [resp.phone, [Validators.required, Validators.pattern(/^[0-9]{7,}$/)]],
              email: [resp.email, [Validators.required, Validators.email], MyValidations.existsEmail(this.userService, resp.email)]
            })
          })
    }
  }

  addUser() {

    const USER: User = {
      name: this.userForm.get('name')?.value,
      lastname: this.userForm.get('lastname')?.value,
      dni: this.userForm.get('dni')?.value,
      phone: this.userForm.get('phone')?.value,
      email: this.userForm.get('email')?.value
    };

    if( this.id !== null ) {
      // Edit User
      this.userService.updateUser( this.id, USER)
          .subscribe( resp => {
            this.router.navigate(['/']);
          }),
          (error: any) => {
            console.log(error)
            this.userForm.reset();
          }
    }else {
      // Add User
      this.userService.appUser( USER )
        .subscribe( resp => {
          this.router.navigate(['/']);
        }),
        (error: any) => {
          console.log(error)
          this.userForm.reset();
        }
    }

  }

}
