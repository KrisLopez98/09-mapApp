import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

// tslint:disable-next-line:class-name
interface colorMarcadores {
  color: string;
  marker: mapboxgl.Marker;
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel = 15;
  center: [number, number] = [ -97.41707739786288, 18.468854714273494 ];

  // Arreglo de marcadores
  marcadores: colorMarcadores[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // Marcador personalizado
    // const marketHtml: HTMLElement = document.createElement('div');
    // marketHtml.innerHTML = 'HolaMundo';

    const markerOne = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);
  }


  // Agregar multiples marcadores
  agregarMarcador(): void {
    // tslint:disable-next-line:no-bitwise
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

    // Se agregan los nuevo marcadores
    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });
  }


  // Obtener la longitud y latitud de un marcador
  irMarcador(marker: mapboxgl.Marker): void {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }
}
