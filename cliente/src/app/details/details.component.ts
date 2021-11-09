import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl} from '@angular/forms';
import { 
    Producto,
    ProductoService,
    Comment,
    CommentService,
    User,
    UserService,
    NotificationService
  
  } from '../core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {

  producto! : Producto;
  currentUser! : User;
  canModify! : boolean;
  comments! : Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  propietario_venta : any;

  constructor(
    private info : NotificationService,
    private route: ActivatedRoute, 
    private router: Router,
    private productoService: ProductoService,
    private userService: UserService,
    private commentsService: CommentService,
    private cd: ChangeDetectorRef
  ){ 
    
  }


  ngOnInit(): void {

    // https://www.joshuacolvin.net/angular-subscribe-to-route-params-and-data/



    // this.route.data.subscribe(
    //   (data) => {

    //     this.producto = data.details.producto;
    //   },
    //   (error) => {


      this.route.data.subscribe(
        (data) => {

          console.log(data.details.owner);
          console.log(this.producto);
          // this.producto = data.details;
          this.producto = data.details.producto;
          this.propietario_venta = data.details.owner;
         
          this.populateComments();
          this.cd.markForCheck();

        },
        (error) => {
        
          console.log(error);
        });


      // Load the current user's data
      this.userService.currentUser.subscribe(
        (userData: User) => {
          this.currentUser = userData;
          console.log(this.currentUser.username);
          console.log(this.producto.author.username);
          this.canModify = (this.currentUser.username === this.producto.author.username);
          this.cd.markForCheck();
        }
      );

//     this.route.data.subscribe(
//       (data) => {
// console.log(data.details.owner);
//         this.producto = data.details.producto;
//         this.propietario_venta = data.details.owner;
//       },
//       (error) => {});
      

  }//endNgoninit

  
  
  trackByFn(index:any, item:any) {
    return index;
  }
  // ObjectId("6176e42d5e94b5235d608c53")
  populateComments() {
    console.log("Entra populate coments");
    console.log(this.producto.slug);
    
    this.commentsService.getAll(this.producto.slug)
      .subscribe(comment => {
        console.log("Vuelve");
     /*    console.log(comment[1].author.image); */
        this.comments = comment;
        
        console.log(this.comments);
        this.cd.markForCheck();
      });
  }

  addComment() {
    console.log("ENTRA ADD COMENT");
    this.isSubmitting = true;
    this.commentFormErrors = {};

    const commentBody = this.commentControl.value;

    this.commentsService
      .add(this.producto.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
          this.info.Succes('Tu comentario se a publicado con éxito!','Comentario publicado!');
          this.cd.markForCheck();
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
          this.cd.markForCheck();
        }
      );
  }

  onDeleteComment(comment:any) {
    console.log("valor ondelete");
    console.log(comment.id);
    console.log(this.producto);
    this.commentsService.destroy(comment.id, this.producto.slug)
      .subscribe(
        success => {
          console.log("VALOR RETORNO DELETE en server");
          this.comments = this.comments.filter((item) => item !== comment);
          this.info.Error('Tu comentario se a borrado con éxito!','Comentario borrado!');
          this.cd.markForCheck();
        }
      );
      }

      onToggleFavorite(favorited: boolean) {

        this.producto.favorited = favorited;
    
        /* Si es like, suma +1 */
        if (favorited && typeof this.producto.favoritesCount === 'number') {
          this.producto.favoritesCount++;
        }
        
        /* Si el dislike, resta -1 al total de likes */
        if (!favorited && typeof this.producto.favoritesCount === 'number') {
          this.producto.favoritesCount--;
        } 
      }




}//endEXPORT

 


