import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { UserService } from '../services/users.services';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // public usuarioAutenticado: boolean = false;  

  mostrarMenuEmitter = new EventEmitter<boolean>();  

  constructor(private router : Router, private service:UserService) { } 
 
  fazerLogin(usuario:Usuario){
    if (!usuario.email 
        && !usuario.password ) {          
      // this.usuarioAutenticado = true;      
      // this.mostrarMenuEmitter.emit(true);      
      this.router.navigate(['/home']);
      console.log("deu certo");
    } else { 
      // this.usuarioAutenticado = false;
      // this.mostrarMenuEmitter.emit(false);      
      this.router.navigate(['/login']);
      console.log("deu errado");
    }
  }
}
