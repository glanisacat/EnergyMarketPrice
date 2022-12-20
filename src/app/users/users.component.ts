import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

export interface UserData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'email', 'phoneNumber'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private crudservices: CrudService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = this.crudservices.getUsers()   
    console.log(this.dataSource, 'datasource');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(): UserData {
  const data = JSON.parse(JSON.stringify(localStorage.getItem('userDetails')));
  console.log(data);

  const name = data.name;
  const surname = data.surname;
  const email = data.email;
  const phoneNumber = data.phoneNumber;

  return {
    name: name,
    surname: surname,
    email: email,
    phoneNumber: phoneNumber,
  };
}
