import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Camera } from 'src/app/model/camera';
import { CameraServiceService } from 'src/app/services/camera-service.service';
import { CameraFormComponent } from '../camera-form/camera-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  displayedColumns: string[] = ['name', 'model', 'resolution', 'ip', 'actions'];
  dataSource = [];
  page = 0;
  pageSize = 10;
  totalItems;
  constructor(private service: CameraServiceService,public dialog: MatDialog) {}



  ngOnInit() {
    this.getCameras(0, this.pageSize);
  }



  getCameras(page?: number, size?: number): void {
    this.service.findAll(page, size).subscribe((res: any) =>{
      this.dataSource = res.body.list;
      console.log(res.body.count);
      this.totalItems = res.body.count;
      
    });
  }

  deleteCamera(id: string){
    this.service.delete(id).subscribe((res: any)=>{
      if(res.type === 'SUCCESS') {
        this.getCameras();
      }
    }
    );
  }

  find(id: string): void {
    this.service.find(id).subscribe((res:Camera) => {
      console.log(res);
    });
  }


  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'  
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result === true) {
          this.deleteCamera(id);
        }
    });
  }

  openUpdateModal(camera: Camera): void {
    const dialogRef = this.dialog.open(CameraFormComponent, {
      width: '350px',
      data: camera  
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.getCameras();
      }       
    });
  }
  pageEvent(event: any): void {
    console.log(event);
    this.getCameras(event.pageIndex, event.pageSize);
  }
}
