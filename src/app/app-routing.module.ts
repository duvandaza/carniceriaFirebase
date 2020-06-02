import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';


const routes: Routes = [
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registrar', component: RegistrarComponent},
  { path: 'producto', component: ProductosComponent},
  { path: 'registrarProducto', component: RegistrarProductoComponent},
  { path: 'presentacion',  component: PresentacionComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'presentacion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
