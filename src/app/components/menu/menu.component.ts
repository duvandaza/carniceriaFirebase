import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth} from '@angular/fire/auth'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  usuario:User;
  desbloquear: boolean = false;

  constructor(private afAuth: AngularFireAuth) { 
    
    
    this.afAuth.user.subscribe((usuario)=>{
      this.desbloquear = true;
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
