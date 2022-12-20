import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  test: AngularFireObject<any>

  constructor(
    public fireServices: AngularFirestore,
    private db: AngularFireDatabase
  ) { }

  createUsers(record:any){
    return this.fireServices.collection('users').add(record)
  }

  getUsers(){
    const users = this.db.list('users')
    console.log(users, 'users');
    
    return this.fireServices.collection('users').get()

  }
}

export interface UserData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
}

@Injectable({
  providedIn: 'root'
})

export class CrudService1 {
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Student
  AddStudent(student: UserData) {
    this.studentsRef.push({
      name: student.name,
      surname: student.surname,
      email: student.email,
      phoneNumber: student.phoneNumber,
    });
  }
  // Fetch Single Student Object
  GetStudent(id: string) {
    this.studentRef = this.db.object('users/' + id);
    return this.studentRef;
  }
  // Fetch Students List
  GetStudentsList() {
    this.studentsRef = this.db.list('users');
    return this.studentsRef;
  }
  // Update Student Object
  UpdateStudent(student: UserData) {
    this.studentRef.update({
      name: student.name,
      surname: student.surname,
      email: student.email,
      phoneNumber: student.phoneNumber,
    });
  }
  // Delete Student Object
  DeleteStudent(id: string) {
    this.studentRef = this.db.object('users/' + id);
    this.studentRef.remove();
  }
}