import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { DetailsCommentComponent } from './details-comment.component';
import { SharedModule } from '../shared';
import { importType } from '@angular/compiler/src/output/output_ast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DetailsComponent, 
    DetailsCommentComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class DetailsModule { }
