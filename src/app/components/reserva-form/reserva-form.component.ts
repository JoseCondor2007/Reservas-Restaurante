import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css'
})
export class ReservaFormComponent implements OnInit, OnChanges {
  @Input() reservaEditar: Reserva | null = null;
  @Output() guardar = new EventEmitter<Reserva>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;

  mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  servicios = ['Almuerzo', 'Cena'];

  constructor(private fb: FormBuilder) {}

  // ---------- VALIDADORES PERSONALIZADOS ----------

  private celularValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valido = /^\d{9}$/.test(control.value);
      return valido ? null : { celularInvalido: true };
    };
  }

  private acompanantesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (valor === null || valor === undefined || valor === '') return null;
      const num = Number(valor);
      if (isNaN(num)) return { noEsNumero: true };
      if (num < 1) return { minimoAcompanantes: true };
      if (num > 20) return { maximoAcompanantes: true };
      return null;
    };
  }

  private fechaNoPasadaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fecha = new Date(control.value);
      fecha.setHours(0, 0, 0, 0);
      return fecha >= hoy ? null : { fechaPasada: true };
    };
  }

  private soloLetrasValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valido = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(control.value);
      return valido ? null : { soloLetras: true };
    };
  }

  private mesaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valida = this.mesas.includes(Number(control.value));
      return valida ? null : { mesaInvalida: true };
    };
  }

  private servicioValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return this.servicios.includes(control.value) ? null : { servicioInvalido: true };
    };
  }

  private descripcionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return control.value.length > 200 ? { descripcionLarga: true } : null;
    };
  }

  // ---------- INICIALIZACIÓN DEL FORMULARIO ----------

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), this.soloLetrasValidator()]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), this.soloLetrasValidator()]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, this.celularValidator()]],
      acompanantes: [2, [Validators.required, this.acompanantesValidator()]],
      mesa: ['', [Validators.required, this.mesaValidator()]],
      fecha: ['', [Validators.required, this.fechaNoPasadaValidator()]],
      servicio: ['', [Validators.required, this.servicioValidator()]],
      descripcion: ['', [Validators.maxLength(200), this.descripcionValidator()]]
    });
  }

  // ---------- DETECCIÓN DE CAMBIOS (Para Editar) ----------

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reservaEditar'] && this.form) {
      if (this.reservaEditar) {
        // Si llega una reserva, rellenamos el formulario
        this.form.patchValue(this.reservaEditar);
      } else {
        // Si se cancela la edición, limpiamos el formulario
        this.form.reset({ acompanantes: 2 });
      }
    }
  }

  // ---------- HELPERS ----------

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  campoValido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.valid && (control.touched || control.dirty);
  }

  // ---------- ENVÍO ----------

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const datos = this.form.value;
    this.guardar.emit({
      id: this.reservaEditar?.id ?? 0,
      nombres: datos.nombres.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      celular: datos.celular.trim(),
      acompanantes: Number(datos.acompanantes),
      mesa: Number(datos.mesa),
      fecha: datos.fecha,
      servicio: datos.servicio,
      descripcion: (datos.descripcion ?? '').trim(),
      eliminado: false
    });
    this.form.reset({
      acompanantes: 2,
      nombres: '', apellidos: '', correo: '', celular: '', mesa: '', fecha: '', servicio: '', descripcion: ''
    });
  }

  onCancelar(): void {
    this.form.reset({ acompanantes: 2 });
    this.cancelar.emit();
  }
}