import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CameraComponent } from './components/camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import { CameraFormComponent } from './components/camera-form/camera-form.component';
import {Router, Routes, RouterModule} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';

const routes :Routes = [
{
  path:'home',
  component:CameraComponent
},
{
  path:'',
  component: CameraComponent,
  pathMatch:'full'
}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CameraComponent,
    CameraFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent, CameraFormComponent]
})
export class AppModule { }
