import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Station } from '../shared/station';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{

  @Input("stations") public _stations!: Station[];

  @Output("station") stationEmitter: EventEmitter<Station> = new EventEmitter<Station>();

  public searchTerm: string = "";

  handleKeyDownEvent(searchTerm: string){
    this.searchTerm = searchTerm;
  }

  handleSelected(stationName: string){
    const station = this.stations.find(station => station.name == stationName);
    if(station == null) return;
    this.stationEmitter.emit(station);

  }

  get stations(): Station[]{
    return this._stations
      .filter(station => station.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.name.indexOf(this.searchTerm) > b.name.indexOf(this.searchTerm) ? 1 : 0);
  }

}
