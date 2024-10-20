import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotaService } from '../../../services/nota.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nota } from '../../../interfaces/nota';

@Component({
  selector: 'app-modal-nota',
  templateUrl: './modal-nota.component.html',
  styleUrl: './modal-nota.component.css'
})
export class ModalNotaComponent {
  notasForm!: FormGroup;
  accionTitle: string = 'Registrar';
  accionButton: string = 'Guardar';

  constructor(private _formBuilder: FormBuilder, private _notasService: NotaService,
    private modalActual: MatDialogRef<ModalNotaComponent>, private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public obNota: Nota,
  ){
    if(this.obNota != null){
      this.accionTitle = 'Ver';
      this.accionButton = 'VerNota';
    }
  }

  ngOnInit(): void {
    this.notasForm = this.initForm();
    if(this.obNota != null){
      this.setDatos(this.obNota);
    }
  }
  
  initForm(): FormGroup{
    return this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      asignatura: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      parcial1: ['', [Validators.required  ]],
      parcial2: ['', [Validators.required]]
    });
  }
  
  setDatos(nota: Nota){
    this.notasForm.patchValue({
      nombre: nota.nombre,
      asignatura: nota.asignatura,
      parcial1: nota.parcial1,
      parcial2: nota.parcial2
    });
  }

  guardarNota(){
    const parcial1 = Number(this.notasForm.value.parcial1);
    const parcial2 = Number(this.notasForm.value.parcial2);
    const promedio = this.promedioNota(parcial1, parcial2);
    const _nota: Nota = {
      nombre: this.notasForm.value.nombre,
      asignatura: this.notasForm.value.asignatura,
      parcial1: this.notasForm.value.parcial1,
      parcial2: this.notasForm.value.parcial2,
      promedio: promedio,
      estado: this.estadoNota(promedio)
    }
    if(this.obNota == null){
      this._notasService.createNota(_nota).subscribe({
        next: () =>{
          this._snackBar.open('Nota registrada con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close("true");
        },
        error: () => {
          this._snackBar.open('Error al registrar la nota', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });      
        }
      });
    }
  }

  estadoNota(promedio: number): string{
    if(promedio >= 7){
      return 'Aprobado';
    }else if(promedio >= 5){
      return 'Supletorio';
    }else{
      return 'Reprobado';
    }
  }

  promedioNota(parcial1: number, parcial2: number): number{
    return (parcial1 + parcial2) / 2;
  }
}
