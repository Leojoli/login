import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UserService } from '../services/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();


  constructor(private router: Router, private service: UserService) { }
  ngOnInit() {

  }

 uuid() {
    return 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  fazerLogin() {
    this.service.getUser().subscribe(data => {
      if (data.filter((data: { email: String; }) => data.email == this.usuario.email)[0] &&
        data.filter((data: { password: String; }) => data.password == this.usuario.password)[0]) {
        localStorage.setItem('token',this.uuid())
        let idData = data.filter((data: { email: String; }) => data.email == this.usuario.email)[0]
        let tokens = localStorage.getItem('token') 
          const id = idData.id; 
          idData.token = tokens
          this.service.putUser(id, idData).subscribe(
            response => {               
              console.log('Dados atualizados com sucesso');
            },
            error => {
              console.error('Erro ao atualizar dados:', error);
            }
          );
        this.router.navigate(['/home']);
      } else {
        console.log("invalido");
      }

    })
    
  }

}
