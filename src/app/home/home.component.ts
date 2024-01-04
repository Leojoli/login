import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
mostrarMenu: boolean = false;

constructor(private authService: AuthService){
  
}

ngOnIntit(){
  console.log(this.mostrarMenu)
  this.authService.mostrarMenuEmitter.subscribe(
    
    mostrar => this.mostrarMenu = mostrar
  );
}


}
