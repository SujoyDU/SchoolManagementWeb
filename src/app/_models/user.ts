export class LoggedInUser {
    user: string[];
    token?: string;
}

export  class User{
  url:string;
  email: string;
  first_name:string;
  last_name:string;
  profile:string[];

}

export class NewUser{

  email: string;
  first_name: string;
  last_name: string;
  password : string;
  profile: {
    user_type: string,
    title: string;
    dob: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    photo: null;
  }

}








export class Department {
  dept_name: string;
  building: string;
  budget: string;
}
