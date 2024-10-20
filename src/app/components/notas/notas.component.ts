import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Nota } from '../../interfaces/nota';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotaService } from '../../services/nota.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalNotaComponent } from './modal-nota/modal-nota.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent implements OnInit{
  notas: Nota [] = [];
  displayedColumns: string[] = ['nombre', 'asignatura', 'promedio', 'estado', 'acciones'];
  notaData!: MatTableDataSource<any>;
  loading: boolean = false;
    

  constructor(private _notasService: NotaService, private _nackbar: MatSnackBar,
    private _dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getNotas();
  }

  getNotas(){
    this.loading = true;
    this._notasService.getNotas().subscribe(data => {
      this.notas = data;
      this.notaData = new MatTableDataSource(data);
      this.loading = false;
    })
  }

  filterNotasData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notaData.filter = filterValue.trim().toLowerCase();
  }

  createNota(){
    this._dialog.open(ModalNotaComponent, {
      width: '340px',
      height: '500px',
      disableClose: true
    }).afterClosed().subscribe(result =>{
      if(result === 'true'){
        this.getNotas();
      }
    });
  }
  
  vetNota(nota: Nota){
    this._dialog.open(ModalNotaComponent, {
      width: '340px',
      height: '500px',
      disableClose: true,
      data: nota
    })
  }

  deleteNota(id: string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una nota eliminada no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.loading = true;
        this._notasService.deleteNota(id).subscribe(() => {
        this.getNotas();
        this._nackbar.open('Nota eliminada con éxito', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
      }
    });
  }
}
