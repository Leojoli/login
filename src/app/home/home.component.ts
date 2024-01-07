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
    setTimeout(() => {
      this.showPage()
    }, 100);
  }

  // valida se o token localstorage é igual ao token da base
  showPage() {
    this.service.getUser().subscribe(data => {
      const tokenLocalStorage = JSON.stringify(localStorage.getItem('token'))
      let tokenJSON = JSON.parse(tokenLocalStorage.replace('"{', '{').replace('}"', '}').replaceAll('\\', '')) === null? []:JSON.parse(tokenLocalStorage.replace('"{', '{').replace('}"', '}').replaceAll('\\', ''))
      const tokenData = data.filter((data: { token: String; }) => data.token == tokenJSON.token)
      // valida se o token localstorage é igual ao token da base
      if (tokenData.length === 0) {
        this.router.navigate(['/login']);
      } else if (tokenData[0].token !== tokenJSON.token){
        this.router.navigate(['/login']);
      }else {
        this.router.navigate(['/home']);
      }
    })
  }

}
