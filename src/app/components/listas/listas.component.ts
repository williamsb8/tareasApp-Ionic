import { AlertController, IonList } from '@ionic/angular';
import { Lista } from './../../models/lista.model';
import { NotasService } from './../../services/notas.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public notasService: NotasService,
               private router: Router, private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if ( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

  }

  borrarLista( lista: Lista ) {

    this.notasService.borrarLista( lista );

  }

  async editarLista( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar Titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0 ){
              return;
            }

            lista.titulo = data.titulo;
            this.notasService.guardarStorage();
            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();
  }

}
