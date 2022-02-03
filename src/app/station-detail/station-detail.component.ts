import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Station } from '../shared/station';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {

  @Input() station!: Station | undefined;
  @Output('closeStation') closeStation: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit(): void {
  }

  getDiagram(type:string): string | undefined{
    console.log(this.station?.measurements);
    return this.station?.measurements?.find(measurment => measurment.code== type)?.imageUrl;
  }
  getDate(): Date | undefined {
    let date = this.station?.lastUpdated;
    if(date)
      return new Date(date);
    return undefined
  }
  close(){
    this.closeStation.emit();
  }
}
