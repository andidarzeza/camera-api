import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Camera } from 'src/app/model/camera';
import { CameraService } from 'src/app/services/camera.service';


@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.css']
})
export class CameraFormComponent implements OnInit, OnDestroy {

  cameraGroup: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    model: ['', [Validators.required]],
    resolution: ['', [Validators.required]],
    ip: ['', [Validators.required]]
  });
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cameraService: CameraService, 
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<CameraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit() {
    if(this.data) {
      this.updateForm(this.data);
    }    
  }

  updateForm(camera: any): void {
    this.cameraGroup.patchValue(camera);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.cameraService
      .save(this.buildPayload(), this.editMode)
      .pipe(this.takeUntilDestroyed())
      .subscribe(()=>this.dialogRef.close(true));
  }

  private buildPayload(): Camera {
    if(this.editMode) {
      return {...this.cameraGroup.value, id: this.data.id} as Camera;
    }
    return this.cameraGroup.value as Camera;
  }

  get editMode() {
    return this.data;
  }

  private takeUntilDestroyed(): any {
    return takeUntil(this.unsubscribe$)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
