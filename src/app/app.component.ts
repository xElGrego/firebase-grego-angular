import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 

  config: any
  colections = { count: 60, data: <any> [] }
  title: 'Grego FireBase - Angular';


  ngOnInit(): void {

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

  pageChanged(event: any){
    this.config.currentPage = event;
  }

}
