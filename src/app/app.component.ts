import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  config: any
  colections = { count: 60, data: <any> [] }


  ngOnInit(): void {

    this.insertardatos()
  }

  insertardatos() {
    for (var i = 0; i < this.colections.count; i++) {
      this.colections.data.push({
        id: i,
        nombre: "nombre " + i,
        apellido: "apellido " + i

      })
    }
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.colections.count
    }
  }

}
