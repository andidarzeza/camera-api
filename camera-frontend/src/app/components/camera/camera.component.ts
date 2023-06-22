import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Camera } from 'src/app/model/camera';
import { CameraService } from 'src/app/services/camera.service';
import { CameraFormComponent } from '../camera-form/camera-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'model', 'resolution', 'ip', 'actions'];
  
  dataSource: Camera[] = [];
  
  page: number = 0;
  pageSize: number = 20;
  
  totalItems: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private cameraService: CameraService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.query();
  }

  query(): void {
    this.cameraService
      .findAll(this.page, this.pageSize)
      .pipe(this.takeUntilDestroyed())
      .subscribe((res: any) =>{
        this.dataSource = res.list;
        this.totalItems = res.count;
      });
  }

  resetAndQuery(): void {
    this.page = 0;
    this.dataSource = [];
    this.query();
  }

  deleteCamera(id: string){
    this.cameraService
      .delete(id)
      .pipe(this.takeUntilDestroyed())
      .subscribe((res: any)=>{
        if(res.type === 'SUCCESS') {
          this.resetAndQuery();
        }
      });
  }

  find(id: string): void {
    this.cameraService
      .find(id)
      .pipe(this.takeUntilDestroyed())
      .subscribe((res: Camera) => {
        console.log(res);
      });
  }


  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {width: '550px'});

    dialogRef
      .afterClosed()
      .pipe(
        this.takeUntilDestroyed(),
        filter((r: boolean) => r)
      )
      .subscribe(_ => this.deleteCamera(id));
  }

  openUpdateModal(camera?: Camera): void {
    const dialogRef = this.dialog.open(CameraFormComponent, {
      width: '550px',
      data: camera
    });

    dialogRef
      .afterClosed()
      .pipe(
        this.takeUntilDestroyed(),
        filter((r: boolean) => r)
      )
      .subscribe(_ => this.resetAndQuery());
  }
  
  pageEvent(event: any): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.query();
  }

  private takeUntilDestroyed(): any {
    return takeUntil(this.unsubscribe$)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
}
