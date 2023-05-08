import { Component } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from '../components/registro/registro.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { BienvenidoComponent } from '../components/bienvenido/bienvenido.component';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent], //Array de MODULOS Y 'COMPONENTES QUE SEAN STANDALONE:true'
})
export class HomePage {
  constructor(private loginService: LoginService, private router: Router, public loadingController: LoadingController, private nativeAudio: NativeAudio) {

  }

  ngOnInit() {
    this.rutas = this.animales;
    this.cargarSonidos(this.sonidosAnimalesESP, this.sonidosNumerosESP, this.sonidosColoresESP);
    this.rutaIdioma = 'assets/idioma/espa.png';
    this.rutaTema = 'assets/a.png';
  }
  rutas: string[] = [];

  rutaIdioma : string = '';
  rutaTema : string = '';

  numeros: string[] = [
    'assets/numeros/uno.png',
    'assets/numeros/dos.png',
    'assets/numeros/tres.png',
    'assets/numeros/cuatro.png',
    'assets/numeros/cinco.png',
  ]
  colores: string[] = [
    'assets/colores/rojo.png',
    'assets/colores/verde.png',
    'assets/colores/azul.png',
    'assets/colores/rosado.png',
    'assets/colores/naranja.png',
  ];
  animales: string[] = [
    'assets/animales/tigre.png',
    'assets/animales/cocodrilo.png',
    'assets/animales/elefante.png',
    'assets/animales/gorila.png',
    'assets/animales/tiburon.png',
  ]

  sonidosAnimalesESP: any[] = [
    {tipo : 'tigre', ruta : 'assets/sonidos/tigreESP.mp3' },
    {tipo : 'cocodrilo', ruta : 'assets/sonidos/cocodriloESP.mp3' },
    {tipo : 'elefante', ruta : 'assets/sonidos/elefanteESP.mp3' },
    {tipo : 'gorila', ruta : 'assets/sonidos/gorilaESP.mp3' },
    {tipo : 'tiburon', ruta : 'assets/sonidos/tiburonESP.mp3' },
  ];

  sonidosAnimalesPOR: any[] = [
    {tipo : 'tigre', ruta : 'assets/sonidos/tigrePOR.mp3' },
    {tipo : 'cocodrilo', ruta : 'assets/sonidos/cocodriloPOR.mp3' },
    {tipo : 'elefante', ruta : 'assets/sonidos/elefantePOR.mp3' },
    {tipo : 'gorila', ruta : 'assets/sonidos/gorilaPOR.mp3' },
    {tipo : 'tiburon', ruta : 'assets/sonidos/tiburonPOR.mp3' },
  ];

  sonidosAnimalesING: any[] = [
    {tipo : 'tigre', ruta : 'assets/sonidos/tigreING.mp3' },
    {tipo : 'cocodrilo', ruta : 'assets/sonidos/cocodriloING.mp3' },
    {tipo : 'elefante', ruta : 'assets/sonidos/elefanteING.mp3' },
    {tipo : 'gorila', ruta : 'assets/sonidos/gorilaING.mp3' },
    {tipo : 'tiburon', ruta : 'assets/sonidos/tiburonING.mp3' },
  ];

  sonidosColoresESP: any[] = [
    {tipo : 'rojo', ruta :'assets/sonidos/rojoESP.mp3'},
    {tipo : 'verde', ruta :'assets/sonidos/verdeESP.mp3'},
    {tipo : 'azul', ruta :'assets/sonidos/azulESP.mp3'},
    {tipo : 'rosado', ruta :'assets/sonidos/rosadoESP.mp3'},
    {tipo : 'naranja', ruta :'assets/sonidos/naranjaESP.mp3'},
  ];

  sonidosColoresPOR: any[] = [
    {tipo : 'rojo', ruta :'assets/sonidos/rojoPOR.mp3'},
    {tipo : 'verde', ruta :'assets/sonidos/verdePOR.mp3'},
    {tipo : 'azul', ruta :'assets/sonidos/azulPOR.mp3'},
    {tipo : 'rosado', ruta :'assets/sonidos/rosadoPOR.mp3'},
    {tipo : 'naranja', ruta :'assets/sonidos/naranjaPOR.mp3'},
  ];

  sonidosColoresING: any[] = [
    {tipo : 'rojo', ruta :'assets/sonidos/rojoING.mp3'},
    {tipo : 'verde', ruta :'assets/sonidos/verdeING.mp3'},
    {tipo : 'azul', ruta :'assets/sonidos/azulING.mp3'},
    {tipo : 'rosado', ruta :'assets/sonidos/rosadoING.mp3'},
    {tipo : 'naranja', ruta :'assets/sonidos/naranjaING.mp3'},
  ];


  sonidosNumerosESP: any[] = [
    {tipo : 'uno', ruta :'assets/sonidos/unoESP.mp3'},
    {tipo : 'dos', ruta :'assets/sonidos/dosESP.mp3'},
    {tipo : 'tres', ruta :'assets/sonidos/tresESP.mp3'},
    {tipo : 'cuatro', ruta :'assets/sonidos/cuatroESP.mp3'},
    {tipo : 'cinco', ruta :'assets/sonidos/cincoESP.mp3'},
  ];

  sonidosNumerosING: any[] = [
    {tipo : 'uno', ruta :'assets/sonidos/unoING.mp3'},
    {tipo : 'dos', ruta :'assets/sonidos/dosING.mp3'},
    {tipo : 'tres', ruta :'assets/sonidos/tresING.mp3'},
    {tipo : 'cuatro', ruta :'assets/sonidos/cuatroING.mp3'},
    {tipo : 'cinco', ruta :'assets/sonidos/cincoING.mp3'},
  ];

  sonidosNumerosPOR: any[] = [
    {tipo : 'uno', ruta :'assets/sonidos/unoPOR.mp3'},
    {tipo : 'dos', ruta :'assets/sonidos/dosPOR.mp3'},
    {tipo : 'tres', ruta :'assets/sonidos/tresPOR.mp3'},
    {tipo : 'cuatro', ruta :'assets/sonidos/cuatroPOR.mp3'},
    {tipo : 'cinco', ruta :'assets/sonidos/cincoPOR.mp3'},
  ];

  idioma: number = 0; //0 Español, 1 Ingles, 2 Portugues
  tema: number = 0; //0 Animales, 1 Colores, 2 numeros
  public async logout() {
    const loading = await this.presentLoading();

    setTimeout(() => {
      this.loginService.desloguear();
      this.router.navigate(['/login']);
      loading.dismiss();
    }, 2000);

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      // message: 'Cerrando sesión',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-class logoout'
    });

    await loading.present();
    return loading;
  }

  async presentChats() {
    const loading = await this.loadingController.create({
      //message: 'Cargando configuraciones',
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-class'
    });

    await loading.present();
    return loading;
  }

  async cambiarTema(tema: number) {
    this.tema = tema;

    const loading = await this.presentChats();
    //0 Animales, 1 Colores, 2 numeros-->

    switch (tema) {
      case 1:
        this.rutaTema = 'assets/c.png';
        this.rutas = this.colores;
        break;
      case 2:
        this.rutaTema = 'assets/n.png';
        this.rutas = this.numeros;
        break;
      default:
        this.rutaTema = 'assets/a.png';
        this.rutas = this.animales;
        break;
    }

    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }

  async cambiarIdioma(idioma: number) {
    this.idioma = idioma;

    const loading = await this.presentChats();


    //0 Español, 1 Ingles, 2 Portugues-->
    switch (idioma) {
      case 1:
        this.rutaIdioma = 'assets/idioma/Usa.png';
        this.quitarYCargarSonidos(this.sonidosAnimalesING, this.sonidosNumerosING, this.sonidosColoresING);
        break;
      case 2:
        this.rutaIdioma = 'assets/idioma/portugues.png';
        this.quitarYCargarSonidos(this.sonidosAnimalesPOR, this.sonidosNumerosPOR, this.sonidosColoresPOR);
        break;
        default:
        this.rutaIdioma = 'assets/idioma/espa.png';
        this.quitarYCargarSonidos(this.sonidosAnimalesESP, this.sonidosNumerosESP, this.sonidosColoresESP);
        break;
    }

    loading.dismiss();
  }

  async quitarSonidos(){
    await this.nativeAudio.unload('tigre');
    await this.nativeAudio.unload('cocodrilo');
    await this.nativeAudio.unload('elefante');
    await this.nativeAudio.unload('gorila');
    await this.nativeAudio.unload('tiburon');

    await this.nativeAudio.unload('uno');
    await this.nativeAudio.unload('dos');
    await this.nativeAudio.unload('tres');
    await this.nativeAudio.unload('cuatro');
    await this.nativeAudio.unload('cinco');

    await this.nativeAudio.unload('rojo');
    await this.nativeAudio.unload('verde');
    await this.nativeAudio.unload('azul');
    await this.nativeAudio.unload('rosado');
    await this.nativeAudio.unload('naranja'); 
  }
  
  async quitarYCargarSonidos(animales: any[], numeros: any[], colores: any[]){
    await this.quitarSonidos();

    this.cargarSonidos(animales, numeros, colores);
  }

  cargarSonidos(animales: any[], numeros: any[], colores: any[]) {
    for(let i = 0; i < animales.length; i++){
      this.nativeAudio.preloadSimple(animales[i].tipo, animales[i].ruta);
    }

    
    // this.nativeAudio.preloadSimple('cocodrilo', animales[1]);
    // this.nativeAudio.preloadSimple('elefante', animales[2]);
    // this.nativeAudio.preloadSimple('gorila', animales[3]);
    // this.nativeAudio.preloadSimple('tiburon', animales[4]);


    for(let i = 0; i < numeros.length; i++){
      this.nativeAudio.preloadSimple(numeros[i].tipo, numeros[i].ruta);
    }

    for(let i = 0; i < colores.length; i++){
      this.nativeAudio.preloadSimple(colores[i].tipo, colores[i].ruta);
    }

    // this.nativeAudio.preloadSimple('uno', numeros[0]);
    // this.nativeAudio.preloadSimple('dos', numeros[1]);
    // this.nativeAudio.preloadSimple('tres', numeros[2]);
    // this.nativeAudio.preloadSimple('cuatro', numeros[3]);
    // this.nativeAudio.preloadSimple('cinco', numeros[4]);

    // this.nativeAudio.preloadSimple('rojo', colores[0]);
    // this.nativeAudio.preloadSimple('verde', colores[1]);
    // this.nativeAudio.preloadSimple('azul', colores[2]);
    // this.nativeAudio.preloadSimple('rosado', colores[3]);
    // this.nativeAudio.preloadSimple('naranja', colores[4]);
  }

  public itemSeleccionado(item: number) {
    //0 Animales, 1 Colores, 2 numeros-->
    //0 Español, 1 Ingles, 2 Portugues-->
    switch (this.idioma) {
      //INGLES
      case 1:
        switch (this.tema) {
          //COLOR EN INGLES
          case 1:
            this.reproducirSonidoColorING(item);
            break;

          //NUMERO EN INGLES
          case 2:
            this.reproducirSonidoNumeroING(item);
            break;

          //ANIMAL EN INGLES
          default:
            this.reproducirSonidoAnimalING(item);
            break;
        }
        break;

      //PORTUGUES
      case 2:
        switch (this.tema) {
          //COLOR EN portuges
          case 1:
            this.reproducirSonidoColorPOR(item);
            break;

          //NUMERO EN portugues
          case 2:
            this.reproducirSonidoNumeroPOR(item);
            break;

          //ANIMAL EN portugues
          default:
            this.reproducirSonidoAnimalPOR(item);
            break;
        }
        break;

      //ESPAÑOL
      default:
        switch (this.tema) {
          //COLOR EN español
          case 1:
            this.reproducirSonidoColorESP(item);
            break;

          //NUMERO EN español
          case 2:
            this.reproducirSonidoNumeroESP(item);
            break;

          //ANIMAL EN español
          default:
            this.reproducirSonidoAnimalESP(item);
            break;
        }
        break;
    }
  }

  reproducirSonidoAnimalESP(item: number) {  
    this.nativeAudio.play(this.sonidosAnimalesESP[item].tipo);
  }

  reproducirSonidoAnimalING(item: number) {
    

    this.nativeAudio.play(this.sonidosAnimalesING[item].tipo);

  }

  reproducirSonidoAnimalPOR(item: number) {
  this.nativeAudio.play(this.sonidosAnimalesPOR[item].tipo);

  }

  reproducirSonidoColorESP(item: number) {
    this.nativeAudio.play(this.sonidosColoresESP[item].tipo);

  }
  reproducirSonidoColorING(item: number) {
    

    this.nativeAudio.play(this.sonidosColoresING[item].tipo);

  }
  reproducirSonidoColorPOR(item: number) {
    this.nativeAudio.play(this.sonidosColoresPOR[item].tipo);

  }

  reproducirSonidoNumeroESP(item: number) {
    this.nativeAudio.play(this.sonidosNumerosESP[item].tipo);

  }

  reproducirSonidoNumeroING(item: number) {
    
    this.nativeAudio.play(this.sonidosNumerosING[item].tipo);

  }

  reproducirSonidoNumeroPOR(item: number) {

    this.nativeAudio.play(this.sonidosNumerosPOR[item].tipo);

  }
}
