import {Component ,OnInit} from '@angular/core';
import{FormBuilder,Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  employeeform;
  fb;
  validationMessages;
  viewmessage;

ngOnInit(){
  this.employeeform = this.fb.group(
    {
    name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(10)]],
    email:['',Validators.required],
    Password:['',Validators.required],
    Skills:this.fb.group({
    Designation:['',Validators.required],
    Experience:['',Validators.required],
    Proficiency:['',Validators.required]
    })
    }
    );


// this.employeeform.valueChanges.subscribe((value)=>{
//   console.log(value);
// })

 this.validationMessages = {
  'name':{
    'required':'Name is required',
    'minlength':'Name must have minimum 2 characters',
    'maxlength':'Name must have maximum length 12 characters'
  },
  'email':{
    'required':'Email is required'
  },
  'Password':{
    'required':'Password is required'
  },
  'Designation':{
    'required':'Designation is required'
  },
  'Experience':{
    'required':'Experience is required'
  },
  'Proficiency':{
    'required':'Proficiency is required'
  }
}

this.viewmessage = {
  'name':[''],
  'email':[''],
  'Password':[''],
  'Designation':[''],
  'Experience':[''],
  'Proficiency':['']
}

}
constructor(fb:FormBuilder){
this.fb = fb;
}

submitData(){
  
//console.log(this.employeeform);
//console.log(this.employeeform.controls);
this.validateFormData(this.employeeform.controls);

}


validateFormData(employeeform: FormGroup){
  for(var x in employeeform){

    if(employeeform[x] instanceof FormGroup){
      this.validateFormData(employeeform[x].controls)  
    }
    
    else{
      this.viewmessage[x] = '';
      console.log("key: "+x +" " + "value" + employeeform[x].value);
      if(!employeeform[x].valid && employeeform[x].errors){
        console.log(employeeform[x].errors);
        for(let controlmatch in  employeeform[x].errors){
          console.log(controlmatch)
          const getdata  = this.validationMessages[x];
          console.log(getdata[controlmatch]);
          this.viewmessage[x] += getdata[controlmatch];
        }
      }
    }
    
  } 
}


}
