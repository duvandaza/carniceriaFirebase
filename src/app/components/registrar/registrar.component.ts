import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  formGroup: FormGroup;
  id:string;
  email: string;
  password: string;
  editable = false;

  constructor( private fb:FormBuilder, private storage: AngularFireStorage, 
               private db : AngularFirestore,
               private activeRoute: ActivatedRoute,
               private asAunth: AngularFireAuth) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
   this.proceso();
  }

  get nombreNoValido() {
    return this.formGroup.get('nombre').invalid && this.formGroup.get('nombre').touched;
  }
  get passNoValido() {
    return this.formGroup.get('pass').invalid && this.formGroup.get('pass').touched;
  }
  get correoNoValido() {
    return this.formGroup.get('correo').invalid && this.formGroup.get('correo').touched;
  }
  get telefonoNoValido() {
    return this.formGroup.get('telefono').invalid && this.formGroup.get('telefono').touched;
  }
  get direccionNoValido() {
    return this.formGroup.get('direccion').invalid && this.formGroup.get('direccion').touched;
  }

  private crearFormulario () {

    this.formGroup = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(3)]],
      correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass     : ['', [Validators.required, Validators.minLength(6)]],
      telefono : ['', [Validators.required, Validators.minLength(10)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  proceso(){
    this.id = this.activeRoute.snapshot.params.clienteID;
    if(this.id != undefined){
      this.editable = true;
      this.db.doc<any>('clientes' + '/' + this.id).valueChanges().subscribe((cliente)=> {
        this.formGroup.setValue({
          nombre:cliente.nombre,
          correo:cliente.correo,
          pass: cliente.password,
          telefono:cliente.telefono,
          direccion: cliente.direccion
        })
      })

    }
  }

  agregar(){
    this.email = this.formGroup.value.correo;
    this.password = this.formGroup.value.pass;
    this.db.collection('clientes').add(this.formGroup.value);
    this.asAunth.auth.createUserWithEmailAndPassword(this.email,this.password)
  }

}
