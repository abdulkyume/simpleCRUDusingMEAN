import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-empedit',
  templateUrl: './empedit.component.html',
  styleUrls: ['./empedit.component.css']
})
export class EmpeditComponent implements OnInit {
  submitted =false;
  editForm!: FormGroup;
  employeeData!: Employee[];
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];

  constructor(
    public fb:FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phnumber:['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  updateProfile(e:any){
    this.editForm.get('designation')?.setValue(e.value, {onlySelf:true});
  }

  get myForm(){
    return this.editForm.controls;
  }

  getEmployee(id:any){
    this.apiService.getEmployee(id).subscribe((data)=>{
      this.editForm.setValue({
        name:data['name'],
        email:data['email'],
        designation:data['designation'],
        phnumber:data['phnumber'],
      });
    });
  }

  updateEmployee(){
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phnumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onSubmit():any {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateEmployee(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/employee-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
