import { Component, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { UserModel, UsersService } from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'suite-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  dataSource: UserModel.User[] = [];
  selection = new SelectionModel<UserModel.User>(true, []);

  constructor(private userService: UsersService) {
    console.log(this.dataSource);
    this.userService
      .getIndex()
      .then((data: Observable<HttpResponse<UserModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<UserModel.ResponseIndex>) => {
          this.dataSource = res.body.data;
          console.log(this.dataSource);
        });
      });
  }

  ngAfterViewInit() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserModel.User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }
}
