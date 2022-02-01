import { Component, Input, OnInit } from '@angular/core';
import { Measurement, Station } from '../shared/station';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {

  @Input() station!: Station | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getDiagram(type:string) {
    this.station?.measurements?.find(measurment => measurment.code== type)
  }
}
