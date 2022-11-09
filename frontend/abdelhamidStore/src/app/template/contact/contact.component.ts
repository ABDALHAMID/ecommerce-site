import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    message: new FormControl('',Validators.required),
    phone: new FormControl('')
  })
  constructor(private service:UserServiceService) { }
  ngOnInit(): void {
  }
  sendMsg(){
    this.service.sendMessage(this.contactForm.value).subscribe((res)=>{
      alert('your msg has been sent to the server.\n thanks you for sending!!')
    })
  }

}
