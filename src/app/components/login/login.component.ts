import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';

  constructor( private fb:FormBuilder, private afAuth: AngularFireAuth) { 
    this.crearLogin();
  }

  ngOnInit(): void {
  }

  get passNoValido() {
    return this.form.get('pass').invalid && this.form.get('pass').touched;
  }
  get correoNoValido() {
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

 crearLogin(){
  this.form = this.fb.group({
    correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    pass     : ['', [Validators.required,]],
  });
 }

 ingresar()
  {
    if(this.form.valid)
    {
      this.datosCorrectos = true;
      this.afAuth.auth.signInWithEmailAndPassword(this.form.value.correo, this.form.value.pass)
      .then((usuario)=>{
        console.log(usuario)
      }).catch((error)=>{
        this.datosCorrectos = false;
        this.textoError = error.message;
      })
    }
    else
    {
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos esten correctos'
     }
    
  }
}
