import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { DetailsCommentComponent } from './details-comment.component';

import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    DetailsComponent, 
    DetailsCommentComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule
  ],
})
export class DetailsModule { }
