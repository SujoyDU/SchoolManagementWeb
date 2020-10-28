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
  url:string;
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

export class Exam {
  url: string;
  exam_name: string;
  teacher:string;
}

export class GiveExam {
  url:string;
  isFinished:string;
  stuexam:string;
  student:string;
}

export class TakeSection {
  take_course: string;
  section: string;
}


export class MarkExam{
  url: string;
  section: number;
  exam_assigner: string;
  stuexam: string;
  student:string;
}

// "url": "http://localhost:8000/api/giveexam/2/",
//   "exam_assigner": "8887766",
//   "section": 3,
//   "current_user": "web1@test.com",
//   "isFinished": true,
//   "stuexam": "http://localhost:8000/api/exam/2/",
//   "student": "http://localhost:8000/api/takes/3/"

export class Mark {
  url: string;
  section: number;
  exam_assigner: string;
  student_id: string;
  current_user: string;
  exam_marks: 81;
  examobj: string;

}
// "url": "http://localhost:8000/api/markexam/2/",
// "section": 3,
// "exam_assigner": "8887766",
// "student_id": "5556611",
// "current_user": "8887722",
// "exam_marks": 81,
// "examobj": "http://localhost:8000/api/giveexam/2/"
