import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { UserService } from '../services/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

constructor(private router: Router, private service: UserService) {
 this.showPage()
 }

  showPage(){
    this.service.getUser().subscribe(data => {
      let searchToken = data.filter((data: { token: String; }) => data.token == localStorage.getItem('token')).length
      if (searchToken == 0) {
       console.log(data.filter((data: { token: String; }) => data.token == localStorage.getItem('token')));
       this.router.navigate(['/login']);
  } 
  })
  }

}
