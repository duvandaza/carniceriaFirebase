import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  grupo: FormGroup;
  constructor( private fb: FormBuilder) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.grupo.get('nombre').invalid && this.grupo.get('nombre').touched;
  }
  get idNoValido() {
    return this.grupo.get('id').invalid && this.grupo.get('id').touched;
  }
  get proveedorNoValido() {
    return this.grupo.get('proveedor').invalid && this.grupo.get('proveedor').touched;
  }
  get precioNoValido() {
    return this.grupo.get('precio').invalid && this.grupo.get('precio').touched;
  }
  get descripcionNoValido() {
    return this.grupo.get('descripcion').invalid && this.grupo.get('descripcion').touched;
  }

  crearFormulario() {
    this.grupo = this.fb.group({
      id         : ['', [Validators.required, Validators.maxLength(3)]],
      nombre     : ['', Validators.required],
      proveedor   : ['', Validators.required],
      precio     : ['', Validators.required],
      descripcion: ['',Validators.required],
      servicio: [''],
    });
  }
}
