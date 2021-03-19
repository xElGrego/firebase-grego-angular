import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

/* Se importa los formularios */
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

//Importamos los métodos creados 
import { FirebaseServicesService } from './services/firebase-services.service'





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  /* FormGroup: agrega los valores de cada formcontrol secundario en un objeto,
  con cada nombre de control como clave */
  estudiantesForm: FormGroup;

  //variables para el modal
  closeResult = '';

  btnactualizar : boolean
 

  idFirebase : string


  //NgbModal : Un servicio para abrir ventanas modales
  /* Crear un modal es sencillo: cree un componente o una plantilla y páselo como 
  argumento al método .open().*/


  constructor(
    //Constructor para el modalService
    private modalService: NgbModal,
    /*Crea un AbstractControl a partir de una configuración especificada por el usuario.
      FormBuilder proporciona azúcar sintáctica que reduce la creación de instancias
      de FormControl, FormGroup o FormArray. */
    public fb: FormBuilder,
    //Firebase
    private firebaseServicesService: FirebaseServicesService

  ) { }

  config: any
  colections = { count: 0, data: <any>[] }
  title: 'Grego FireBase - Angular';


  ngOnInit(): void {

    this.idFirebase = ""
    this.btnactualizar = false
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.colections.data
    }

    this.estudiantesForm = this.fb.group(
      {
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required]
      }
    );

    this.firebaseServicesService.getEstudiantes().subscribe(resp => {
      this.colections.data = resp.map((e: any) => {
        return {
          id: e.payload.doc.data().id,
          nombre: e.payload.doc.data().nombre,
          apellido: e.payload.doc.data().apellido,
          idFirebase: e.payload.doc.id
        }
      })
    },
      error => {
        console.error(error)
      }
    );
  }


  actualizar(){
    this.btnactualizar = false

    if(this.idFirebase != null){
      this.firebaseServicesService.updateEstudiante(this.idFirebase,this.estudiantesForm.value).then(resp => {
        this.estudiantesForm.reset()
        this.modalService.dismissAll()
      }).catch(error => {
        console.error(error)
      })
    }
  }

  //Se cambia de página dependiendo del currentPage
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  delet(item: any) {
    this.firebaseServicesService.deleteEstudiante(item.idFirebase)
  }

  guardarEstudiante() {
    this.btnactualizar = false

    //then: que va a pasar cuando se guarde al estudiante
    this.firebaseServicesService.createEstudiante(this.estudiantesForm.value).then(resp => {
      this.estudiantesForm.reset()
      this.modalService.dismissAll()

    }).catch(error => {
      console.error(error)
    })
  }
  //Se abre el modal 
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Se abre el form con la data anterior
  openEditar(content: any, item: any) {
    this.btnactualizar = true
    this.estudiantesForm.setValue({
      id: item.id,
      nombre: item.nombre,
      apellido: item.apellido,
    })
    this.idFirebase = item.idFirebase

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


