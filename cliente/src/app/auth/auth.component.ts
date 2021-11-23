import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService, NotificationService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private info: NotificationService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {

 
      this.authType = this.router.url; // Cojemos la url(/login o /register) 
    
      this.title = (this.authType === '/login') ? 'Iniciar Sesión' : 'Registrar-se'; // Comprovamos
     
      if (this.authType === '/register') {
        console.log('oalal');
        this.authForm.addControl('username', new FormControl()); // Añadimos username para el register
      }
      this.cd.markForCheck();
 
  }

   submitForm() {

     this.isSubmitting = true;

    const credentials = this.authForm.value;
    
    this.userService.attemptAuth(this.authType, credentials).subscribe( data => {

      this.router.navigateByUrl('/'); 
      this.info.Succes('Iniciando sesión...','Usuario correcto');

      },
      err => {
        this.info.Error('Campos incorrectos','Error');
        this.isSubmitting = false;
        this.cd.markForCheck();
      } 
    ); 
  } 
}
