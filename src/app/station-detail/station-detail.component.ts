import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { Station } from '../shared/station';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {

  private _showDialog: boolean = true;

  @Input() station!: Station | undefined;
  @Output('closeStation') closeStation: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this._showDialog = window.outerWidth > 500;
    fromEvent(window, 'resize').subscribe( (evt: any) => {
      this._showDialog = evt?.target?.outerWidth > 500; 
    })
  }

  getDiagram(type:string): string | undefined{
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
  openDialog(img:string | undefined){
    if(!this._showDialog) return;
    const dialog = this.dialog.open(DiagramDialog, {
      data: img
    });
  }
}

@Component({
  selector: 'app-diagram-dialog',
  templateUrl: './diagram-dialog.html',
})
export class DiagramDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string){}
}
