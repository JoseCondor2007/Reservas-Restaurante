import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css'
})
export class ReservaListComponent {
  @Input() reservas: Reserva[] = [];
  @Output() editar = new EventEmitter<Reserva>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() restaurar = new EventEmitter<number>();

  get activas(): number { return this.reservas.filter(r => !r.eliminado).length; }
  get eliminadas(): number { return this.reservas.filter(r => r.eliminado).length; }
}