import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .row {
      background-color: white;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 4px;
      position: fixed;
      z-index: 9999;
      width:40%;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel = 10;
  center: [number, number] = [ -97.41707739786288, 18.468854714273494 ];

  constructor() { }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    // EVENTLISTENER DEL MAPA Ayuda para saber cuando el zoom cambia
    this.mapa.on('zoom', (evento) => {
      this. zoomLevel = this.mapa.getZoom();
    });
    // EVENTLISTENER: Funciona para obtener un maximo en el zoom
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 20){
        this.mapa.zoomTo(20);
      }
    });
    // EVENTLISTENER: Funciona para obtener la data(valor) de la longitud y latitud en
    // -------------- cuanto cambie zoom MOVIMIENTO DEL MAPA
    this.mapa.on('move', (evento) => {
      const target = evento.target;
      const {lng, lat} = target.getCenter();
      this.center = [ lng, lat];
    });
  }

  zoomIn(): void {
    this.mapa.zoomIn();
  }

  zoomOut(): void {
  this.mapa.zoomOut();
  }

  // Obtener el valor cuando este cambia
  zoomChange(valor: string): void {
    this.mapa.zoomTo(Number(valor));
  }

}
