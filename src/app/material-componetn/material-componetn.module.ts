import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule, } from '@angular/material/icon';
import { MatToolbarModule, MatSidenavModule,  MatListModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  imports: [MatCardModule, MatToolbarModule, MatSidenavModule,  MatListModule, MatIconModule,  MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  exports: [MatCardModule, MatToolbarModule, MatSidenavModule,  MatListModule, MatIconModule,  MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
})
export class MaterialComponetnModule { }
