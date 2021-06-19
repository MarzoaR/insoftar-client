export class User {

  _id?: string;
  name: string;
  lastname: string;
  dni: number;
  email: string;
  phone: number;

  constructor(  name: string,
                lastname: string,
                dni: number,
                email: string,
                phone: number
              ) {

    this.name = name;
    this.lastname = lastname;
    this.dni = dni;
    this.email = email;
    this.phone = phone;

  }

}