import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import * as leaf from "leaflet";

declare let L: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  map: mapboxgl.Map;

  @ViewChild('mapElement') mapElement: ElementRef;

  firstpolyline: leaf.Polyline;

  constructor() {

  }

  ngOnInit(): void {

    var mymap = leaf.map('mapid').setView([28.613, 77.209], 5);
    var greenIcon = leaf.icon({
      iconUrl: './assets/leaf/images/marker-icon.png',
      shadowUrl: './assets/leaf/images/marker-shadow.png',

      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    leaf.marker([28.613, 77.209], { icon: greenIcon }).addTo(mymap);
    leaf.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: ['a', 'b', 'c']
    }).addTo(mymap);

    var pointA = new leaf.LatLng(28.635308, 77.22496);
    var pointB = new leaf.LatLng(28.984461, 77.70641);
    var pointList = [pointA, pointB];


    var pointA = new leaf.LatLng(12.9716, 77.5946);
    var pointB = new leaf.LatLng(17.3850, 78.4867);
    var pointC = new leaf.LatLng(13.0827, 80.2707);
    var pointList = [pointA, pointB, pointC];

    this.firstpolyline = new leaf.Polyline(pointList, {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1
    });
    this.firstpolyline.addTo(mymap);

    var router = L.routing.osrmv1()

    router.route([
      L.routing.waypoint([57.7, 11.9]),
      L.routing.waypoint([57.74, 11.93])
    ], function(err, routes) {
      if (err || routes.length < 1) {
        return console.error(err)
      }
      
      var line = L.routing.line(routes[0]).addTo(mymap)
      mymap.fitBounds(line.getBounds())
    })

    var myMarker1 = leaf.marker(pointA, { draggable: true, }).addTo(mymap);
    var myMarker2 = leaf.marker(pointB, { draggable: true, }).addTo(mymap);
    var myMarker3 = leaf.marker(pointC, { draggable: true, }).addTo(mymap);

    myMarker1.on('drag', this.dragHandler);
    myMarker1.on('dragend', this.dragEndHandler);
    myMarker1.on('dragstart', this.dragStartHandler);
    //
    myMarker2.on('drag', this.dragHandler);
    myMarker2.on('dragend', this.dragEndHandler);
    myMarker2.on('dragstart', this.dragStartHandler);
    //
    myMarker3.on('drag', this.dragHandler);
    myMarker3.on('dragend', this.dragEndHandler);
    myMarker3.on('dragstart', this.dragStartHandler);
  }

  dragStartHandler = (event) => {
    console.log("Drag Starrt", event, typeof event);
    let latngs = this.firstpolyline.getLatLngs();
    console.log(">Poly Latngs", latngs);

  }

  dragHandler(event) {
    console.log("drag handler", event, typeof event);
  }

  dragEndHandler(event: leaf.DragEndEvent) {
    console.log('drag end', event, typeof event);
    console.info(event.target.latLang);
  }


  ngAfterViewInit() {

  }

}
