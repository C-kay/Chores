import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Plugins} from '@capacitor/core';
import { Observable } from 'rxjs';

const {Geolocation} = Plugins;

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  locations: Observable<any>;
  //locationsCollection: AngularFirestoreCollection<any>

  @ViewChild('map', {static:false}) mapElement: ElementRef;
  map: any;
  markers=[];
  isTracking:boolean = false;
  watch:string;
  place ="Select service location";

  //const isAvailable = Capacitor.isPluginAvailable('Camera'); to check if plugin exists in web
  constructor() { }

  ionViewWillEnter(){
    this.loadmap();
  }

  loadmap(){
    let latlng = new google.maps.LatLng(51.9036442, 7.6673267);

    let mapOptions ={
      center: latlng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


  ngOnInit() {
    //this.loadmap();
  }


  startTracking(){
    this.isTracking = true;
    this.watch = Geolocation.watchPosition({}, (position, err) =>{
      if(position){
        this.addNewLocation(
          position.coords.latitude,
          position.coords.longitude,
          position.timestamp
        );
      }
    });
  }

  stopTracking(){
    this.isTracking = false;

  }

  addNewLocation(lat, lng, timestamp){
    //should go to database
    let db={
      lat:lat,
      lng:lng,
      timestamp:timestamp
    }

    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(5);
  }

  deleteLocation(pos){
    //this.locationCollection.doc(pos.id).delete();
  }

  //get location from firebase
  getLocationFromDb(){
    // this.locations = this.locationsCollection.snapshotChanges().pipe(
    //   map(actions =>
    //     actions.map(a =>{
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return {id, ...data};
    //     }) 
    //   )
    // );

    //update loaction
    // this.locations.subscribe(locations =>{
    //   console.log('new location: ', locations);
    //   this.updateMap(location);
    // });
  }

  updateMap(locations){
    this.markers.map(marker => marker.setMap(null));
    this.markers =[];
    this.map.setCenter()

    for( let loc of locations){
      let latlng = new google.maps.LatLng(loc.lat, loc.lng);

      let marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: this.map 
      });

      this.markers.push(marker);
    }
  }


}
