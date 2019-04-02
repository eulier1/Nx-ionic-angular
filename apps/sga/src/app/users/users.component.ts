import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { UserModel, UsersService } from '@suite/services';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'suite-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  dataSource: UserModel.User[] = [];
  selection = new SelectionModel<UserModel.User>(true, []);
  navStart: Observable<NavigationStart>;

  constructor(private userService: UsersService, private router: Router) {
    console.log(this.dataSource);

    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    console.log('users');
    this.userService
      .getIndex()
      .then((data: Observable<HttpResponse<UserModel.ResponseIndex>>) => {
        data.subscribe((res: HttpResponse<UserModel.ResponseIndex>) => {
          this.dataSource = res.body.data;
          console.log(this.dataSource);
        });
      });
  }

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
