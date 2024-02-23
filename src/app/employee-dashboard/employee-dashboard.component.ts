import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !:FormGroup
  employeeModelobj : EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd : boolean | undefined;
  showUpdate : boolean | undefined;

  constructor(private formbuilder:FormBuilder, private api:ApiService) { }
  
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      salary :['']
    })
    this.getAllemployee();
  }

  clickaddemployee()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeedetails(){
    this.employeeModelobj.firstname = this.formValue.value.firstname;
    this.employeeModelobj.lastname = this.formValue.value.lastname;
    this.employeeModelobj.email = this.formValue.value.email;
    this.employeeModelobj.mobile = this.formValue.value.mobile;
    this.employeeModelobj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee added successfully");
      
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllemployee();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllemployee(){
    this.api.getEmployee().subscribe(res=>
      {this.employeeData=res;
      })
  }

  deleteEmployee(row : any)
  {
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllemployee();

    })
  }

  onEdit(row : any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelobj.id= row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);

   
  }

  UpdateEmployeedetails(){
    this.employeeModelobj.firstname = this.formValue.value.firstname;
    this.employeeModelobj.lastname = this.formValue.value.lastname;
    this.employeeModelobj.email = this.formValue.value.email;
    this.employeeModelobj.mobile = this.formValue.value.mobile;
    this.employeeModelobj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllemployee();
    })
  }
}
