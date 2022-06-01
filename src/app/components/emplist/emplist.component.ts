import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-emplist',
  templateUrl: './emplist.component.html',
  styleUrls: ['./emplist.component.css']
})
export class EmplistComponent implements OnInit {

  Employee:any = [];

  constructor(private apiService: ApiService) {
    this.readEmployee();
   }

  ngOnInit(): void {
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data)=>this.Employee=data);
  }

  removeEmployee(employee:any, index:any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }
}
