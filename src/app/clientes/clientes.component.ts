import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ClienteService } from '../clientes/cliente.service';
import { DatePipe, Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { HttpEvent, HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cliente: FormGroup = new FormGroup({
    // Aquí puedes definir tus controles de formulario si estás utilizando FormGroup
    // Por ejemplo:
    // nombre: new FormControl(''),
    // apellido: new FormControl(''),
    // ...
  });

  floatLabelControl = new FormControl('never');
  clientes: any[] ;
  idEstado = 1;
  selected = '';
  filteredOptions: Observable<any[]> ;
  filteredOptionsTipo: Observable<any[]> ;
  filtered: Observable<any[]>[] ;
  dataSource = new MatTableDataSource<any>();


  constructor(private ClienteService: ClienteService, public HttpClient: HttpClient, private fb: FormBuilder, private _location: Location, private datePipe: DatePipe,
    private router: Router, private route: ActivatedRoute, public dialog: MatDialogModule) { 
  
    }

  ngOnInit(): void {
    
    this.cliente = this.fb.group({
      floatLabel: this.floatLabelControl,
      busqueda: [''],
      selEstados: ['']
    });
    this.route.params.subscribe(
      (params: Params) => {
        // this.idEstado = params.id;
        this.selected = '';
        this.filteredOptions = of([]);
        this.loadclientes();
      }
    );
  }


  loadclientes() {


    this.ClienteService.getclientes().subscribe(
      data => {
        if (data.length > 0) {
          this.clientes = data;
          console.log(this.clientes);
        } else {
          //swal("clientes Nominales", "No se han encontrado clientes", "info")
        }

        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  filterMatTable(filterValue: any) {
    this.dataSource.filter = filterValue;
  }

  viewcliente(item:Object): void {
          this.modalcliente(item);
          

  }


  modalcliente(dataDep:Object) {
console.log(dataDep);
  

  }
    
  }
