import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Order, Profile,ProfilesService,UserService} from 'src/app/core';
import { NotificationService } from 'src/app/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {

  constructor(
    private info : NotificationService,
    private profileService: ProfilesService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) { }

  @Input() order!: Order;
  @Output() RatingValoration: EventEmitter<Order> = new EventEmitter();
  value : any;
  disabled? : any;



  ngOnInit(): void {

      this.getRatingOfProduct();

  }

  onValueChange($event: number) {

    this.value = $event
    this.order.rating = $event;

    this.RatingValoration.emit(this.order);           /* Pasamos al componente padre */
    this.cd.markForCheck();
  }



  getRatingOfProduct(){
   
      this.value = this.order.rating;   
    
      this.cd.markForCheck();         /* Valorar  */
    
  }

  

}
