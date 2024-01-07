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
  invalidForm: any;
  public users: Usuario = new Usuario();


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
      
      

      let dadosEmail = !data.filter((data: { email: String; }) =>  data.email == this.users.email)[0] == true? "E-mail não econtrado": data.filter((data: { email: String; }) =>  data.email == this.users.email)[0].email
      let dadosPassword = !data.filter((data: { password: String; }) => data.password == this.users.password)[0] == true? "Senha incorreta": data.filter((data: { password: String; }) => data.password == this.users.password)[0].password
     
    //  validar formulário
      this.invalidForm = document.querySelectorAll(".invalid")
      if (dadosEmail === "E-mail não econtrado") {
        this.invalidForm[0].style.display ='block'
      } else{
        this.invalidForm[0].style.display ='none'
      }


      if (dadosPassword === "Senha incorreta"){
        this.invalidForm[1].style.display ='block'
      } else{
        this.invalidForm[1].style.display ='none'
      }

     


      let token = JSON.stringify(`{"token":"${this.uuid()}","email":"${dadosEmail}"}`)
      let tokenJSON = token.replace('"{','{').replace('}"','}').replaceAll('\\','')

      if (dadosEmail == this.users.email && dadosPassword == this.users.password) {
        localStorage.setItem('token',tokenJSON)
        
        let idData = data.filter((data: { email: String; }) => data.email == this.users.email)[0]
          const id = idData.id; 
          const tokenLocalStorage = JSON.stringify(localStorage.getItem('token'))      
          let tokenJSONs = JSON.parse(tokenLocalStorage.replace('"{','{').replace('}"','}').replaceAll('\\',''))
          idData.token = tokenJSONs.token
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
