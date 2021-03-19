import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {

  constructor(
    private  firestore : AngularFirestore
  ) { }

  //Método para obtener los estudiantes de la base de datos en Firebase  
  getEstudiantes(){
    return this.firestore.collection("estudiantes").snapshotChanges();
  }

 //Método para crear estudiantes en la base de datos en Firebase  
  createEstudiante(estudiante:any){
    return this.firestore.collection("estudiantes").add(estudiante);
  }

  //Método para actualizar estudiantes en la base de datos en Firebase  
  updateEstudiante(id:any , estudiante: any){
    return this.firestore.collection("estudiantes").doc(id).update(estudiante);
  }

  //Método para eliminar estudiantes en la base de datos en Firebase  
  deleteEstudiante(id:any){
    return this.firestore.collection("estudiantes").doc(id).delete();
  }
}
