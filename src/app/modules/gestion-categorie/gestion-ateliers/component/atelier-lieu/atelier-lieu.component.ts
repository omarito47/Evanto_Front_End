import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-atelier-lieu',
  templateUrl: './atelier-lieu.component.html',
  //styleUrls: ['./atelier-lieu.component.css']
})
export class AtelierLieuComponent implements OnInit, AfterViewInit {

  map: L.Map | undefined;
  markers: L.Marker[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    // Coordonnées centrales pour centrer la carte
    const centerCoordinates: L.LatLngLiteral = { lat: 34.0, lng: 9.0 };

    this.map = L.map('map').setView([centerCoordinates.lat, centerCoordinates.lng], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Gouvernorats avec leurs coordonnées
    const gouvernorats = [
      { nom: 'Ariana', coordonnees: { lat: 36.8663, lng: 10.1647 } },
      { nom: 'Béja', coordonnees: { lat: 36.7311, lng: 9.1829 } },
      { nom: 'Bizerte', coordonnees: { lat: 37.2744, lng: 9.8737 } },
      { nom: 'Siliana', coordonnees: { lat: 36.083, lng: 9.3736 } },
      { nom: 'Jerba', coordonnees: { lat: 33.8264, lng: 10.7759 } },
    ];

    // Ajouter des marqueurs pour chaque gouvernorat
    gouvernorats.forEach(gouvernorat => {
      const marker = L.marker([gouvernorat.coordonnees.lat, gouvernorat.coordonnees.lng]).addTo(this.map!);
      marker.bindPopup(`<b>${gouvernorat.nom}</b>`);

      // Ajouter un événement de clic sur chaque marqueur
      marker.on('click', () => {
        alert(`Gouvernorat : ${gouvernorat.nom}`);
      });

      this.markers.push(marker); // Ajouter le marqueur à la liste des marqueurs
    });
  }
}
