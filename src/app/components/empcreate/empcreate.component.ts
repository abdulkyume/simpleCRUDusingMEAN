import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-empcreate',
  templateUrl: './empcreate.component.html',
  styleUrls: ['./empcreate.component.css']
})
export class EmpcreateComponent implements OnInit {

  submitted = false;
  employeeForm !: FormGroup;
  EmployeeProfile : any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private ngzone:NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm(){
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phnumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  //choose designation with select dropdown
  updateProfile(e:any){
    this.employeeForm.get('designation')?.setValue(e.value, {onlySelf: true});
  }

  //getter to access form control
  get myForm(){
    return this.employeeForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.employeeForm.valid){
      return false;
    }
    else{
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: ()=> {
          console.log('Employee Successfully Created'),
          this.ngzone.run(()=>this.router.navigateByUrl('/employee-list'));
        },
        error: (e)=>{
          console.log(e);
        }
      });
    }
  }
}
