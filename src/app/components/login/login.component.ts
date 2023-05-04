import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonInput, IonicModule, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { LoadingController } from '@ionic/angular';
import { settings } from 'cluster';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  //YA NO SE USAN MODULOS, POR LO QUE HAY QUE INDICAR QUE 'standalone : true'.
  //Debido a esto, NO SE COLOCA EL 'LoginComponent' en el array de 'declarations' (array de componentes), 
  //si no que AHORA se lo coloca en el array de 'imports' (donde van los modulos),
  //porque al ser 'standalone', sera su propio MODULO en SI MISMO.

  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  //*AVISO QUE VOY A EMITIR UN EVENTO PARA QUE UN COMPONENTE PADRE ESTE ATENTO.
  @Output() newItemEvent = new EventEmitter<boolean>();

  //SI LOS PONGO PRIVADO, EL HTML NO LO PUEDE LEER.
  email: string = "";
  password: string = "";
  esUsuarioValido: boolean = false;
  mensajeError: string = '';
  mensajePass: string = '';
  mensajeEmail: string = '';
  usuarios: Usuario[] = [];
  ruta: string = "/resources/icon.png";
  constructor(private platform: Platform , private nativeAudio: NativeAudio, private loginService: LoginService, private router: Router, public loadingController: LoadingController) { }
  ngOnInit() {
    this.usuarios.push(new Usuario('admin@admin.com', '111111'));
    this.usuarios.push(new Usuario('invitado@invitado.com', '222222'));
    this.usuarios.push(new Usuario('usuario@usuario.com', '333333'));
    this.usuarios.push(new Usuario('tester@tester.com', '555555'));

    this.platform.backButton.subscribeWithPriority(0, () => {
      // Agrega la acción que deseas realizar cuando se presiona el botón de retroceso   
    });




   // this.nativeAudio.preloadSimple('uniqueId1', 'assets/prueba.mp3')
      // .then(() => {
      //   this.nativeAudio.play('uniqueId1');
      // })
      ;//.then(onSuccess, onError);
    /*
this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);

this.nativeAudio.play('uniqueId1').then(onSuccess, onError);

// can optionally pass a callback to be called when the file is done playing
this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));

this.nativeAudio.loop('uniqueId2').then(onSuccess, onError);

this.nativeAudio.setVolumeForComplexAsset('uniqueId2', 0.6).then(onSuccess,onError);

this.nativeAudio.stop('uniqueId1').then(onSuccess,onError);

this.nativeAudio.unload('uniqueId1').then(onSuccess,onError);
 
*/
 
  }

  async login() {
      //  this.nativeAudio.play('uniqueId1');
    
    let errorEnDatos = false;
    let emailValido = false;

    if (this.email == '') {
      errorEnDatos = true;
      this.mensajeEmail = "Falta ingresar el correo electrónico.";
    } else {
      emailValido = this.validarEmail();
      if (!emailValido)
        this.mensajeEmail = "Formato de correo electrónico inválido.";
      else
        this.mensajeEmail = '';
    }

    if (this.password == '') {
      errorEnDatos = true;
      this.mensajePass = "Falta ingresar la contraseña.";
    } else
      if (this.password.length < 6) {
        errorEnDatos = true;
        this.mensajePass = "La contraseña debe contener al menos 6 caracteres.";
      }
      else
        this.mensajePass = '';

    if (!errorEnDatos && emailValido) {
      let loading = await this.presentLoading();
      this.loginService.loguearUsuario(this.email, this.password)
        .then(() => {
          this.limpiarCampos();
          this.router.navigate(['/home'])
          .then(()=>{
            setTimeout(() => {
              loading.dismiss();
            }, 2000);
          });     
        }).catch(() => {
          this.mensajeError = "Correo o contraseña inválidos.";
        });
    } else {
      this.mensajeError = 'Corrija los errores y vuelva a intentar.';
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
     // message: 'Cargando...',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-class'
    });
    await loading.present();
    return loading;
  }


  validadCampoVacio(item: IonInput) {
    let errorEnDatos = false;

    if (item.type === "password") {
      if (item.value != '')
        this.mensajePass = '';
      else
        errorEnDatos = true;
    }

    if (item.type === "text") {
      if (item.value != '')
        this.mensajeEmail = '';
      else
        errorEnDatos = true;
    }

    if (this.mensajeEmail == '' && this.mensajePass == '') {
      this.mensajeError = '';
    }
  }

  limpiarCampos() {
    this.email = '';
    this.password = '';
  }
  validarEmail() {
    const patron = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
    if (this.email.length > 6) {
      return patron.test(this.email);
    }
    return false;
  };

  addNewItem(value: boolean) {
    //EMITO UN VALOR, PARA QUE LO RECIBA EL PADRE.
    this.newItemEvent.emit(value);
  }

  registrar() {
    this.router.navigate(['/registro']);
  }

  limpiarErrores() {
    this.mensajeEmail = '';
    this.mensajeError = '';
    this.mensajePass = '';
  }

  cargarUsuario(indice: number) {
    if (indice >= 0 && indice < this.usuarios.length) {
      this.limpiarErrores();
      let usuario = this.usuarios[indice];
      this.email = usuario.usuario;
      this.password = usuario.password;
    }
  }
}
