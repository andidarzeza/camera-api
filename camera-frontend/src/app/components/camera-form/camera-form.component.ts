import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera } from 'src/app/model/camera';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { CameraServiceService } from 'src/app/services/camera-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.css']
})
export class CameraFormComponent implements OnInit {
  cameraGroup: FormGroup;
  updateMode = false;
  saveUpdateButtonLabel = "Add";
  

  constructor(private service: CameraServiceService, private fb: FormBuilder, public dialogRef: MatDialogRef<CameraFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.setInitialForm();
    if(this.data) {
      this.updateMode = true;
      this.saveUpdateButtonLabel = "Update";
      this.updateForm(this.data);
    }    
  }

  updateForm(camera: any): void {
    this.cameraGroup.patchValue(camera);
  }

  setInitialForm(): void {
    this.cameraGroup = this.fb.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]],
      resolution: ['', [Validators.required]],
      ip: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if(this.updateMode) {
      this.service.update(this.data.id, this.cameraGroup.value).subscribe((res:any)=>{
        this.dialogRef.close(true);
      });
    } else {
      this.service.add(this.cameraGroup.value).subscribe((res: any) => {
        console.log(res);
        this.dialogRef.close(true);
      })
    }
  }

}
