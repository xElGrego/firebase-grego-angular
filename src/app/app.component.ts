import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

/* Se importa los formularios */
import { FormBuilder, FormGroup, Validators } from '@angular/forms'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  /* FormGroup: agrega los valores de cada formcontrol secundario en un objeto,
  con cada nombre de control como clave */
  estudiantesForm : FormGroup;

  //variables para el modal
  closeResult = '';


  //NgbModal : Un servicio para abrir ventanas modales
  /* Crear un modal es sencillo: cree un componente o una plantilla y páselo como 
  argumento al método .open().*/

 
  constructor(
     //Constructor para el modalService
    private modalService: NgbModal,
    /*Crea un AbstractControl a partir de una configuración especificada por el usuario.
      FormBuilder proporciona azúcar sintáctica que reduce la creación de instancias
      de FormControl, FormGroup o FormArray. */
    public fb : FormBuilder,
  ) { }

  config: any
  colections = { count: 5, data: <any>[] }
  title: 'Grego FireBase - Angular';


  ngOnInit(): void {
    this.estudiantesForm = this.fb.group(
      {
        id: ['',Validators.required],
        nombre: ['',Validators.required],
        apellido:['',Validators.required]
      }
    );
    this.insertardatos()
  }

  insertardatos() {
    for (var i = 0; i < this.colections.count; i++) {
      this.colections.data.push({
        id: i,
        nombre: "Nombre " + i,
        apellido: "Apellido " + i
      })
    }

    //Aqui se controla la paginación
    this.config = {
      itemsPerPage: 11,
      currentPage: 1,
      totalItems: this.colections.count
    }
  }
  //Se cambia de página dependiendo del currentPage
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  delet(item: any) {
    this.colections.data.pop(item)
  }

  save(){
    this.colections.data.push(this.estudiantesForm.value)
    this.estudiantesForm.reset()
    this.modalService.dismissAll()
  }


   //Se abre el modal 
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


