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

export class Teacher {
  uid: string;
  tid: string;
  dept_name: string;
  designation: string;
  salary: string;
}

export class Student{
  uid: string;
  sid: string;
  dept_name: string;
  total_credit: number;
}
export class Department {
  dept_name: string;
  building: string;
  budget: string;
}

export class Course {
  course_id: string;
  course_name: string;
  dept_name: string;
  credits: number;
}

export class Section {
  url: string;
  sec_id: string;
  semester:string;
  year: string;
  course_id: string;
}

export interface StudentList {
  sid: string;
}

export interface TeacherInfo {
  tid: string;
  full_name: string;
}

export interface SectionInfo {
  sec_id: string;
  course_id: string;
}

export class TeachesDetail{
  teacherInfo: TeacherInfo;
  sectionInfo: SectionInfo;
  studentList: StudentList[];
}

export class Teaches {
  tid: string;
  teachcourse: string;
  studentList : StudentList[];
}

export class Takes {
  url: string;
  course_marks: string;
  course_grade: string;
  course_gpa: string;
  course_status: string;
  sid: string;
  take_course: string;
}
