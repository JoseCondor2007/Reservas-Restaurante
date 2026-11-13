import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { Reserva } from './models/reserva.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReservaFormComponent, ReservaListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  reservas: Reserva[] = [
    { id: 1,  nombres: 'Ana',    apellidos: 'García',    correo: 'ana.garcia@email.com',    celular: '912345678', acompanantes: 2, mesa: 3,  fecha: '2026-11-20', servicio: 'Cena',     descripcion: 'Alergia a mariscos',     eliminado: false },
    { id: 2,  nombres: 'Luis',   apellidos: 'Pérez',     correo: 'luis.perez@email.com',    celular: '923456789', acompanantes: 4, mesa: 7,  fecha: '2026-11-21', servicio: 'Almuerzo', descripcion: '',                       eliminado: false },
    { id: 3,  nombres: 'Marta',  apellidos: 'Ruiz',      correo: 'marta.ruiz@email.com',    celular: '934567890', acompanantes: 1, mesa: 2,  fecha: '2026-11-22', servicio: 'Cena',     descripcion: 'Mesa junto a ventana',   eliminado: false },
    { id: 4,  nombres: 'Carlos', apellidos: 'López',     correo: 'carlos.lopez@email.com',  celular: '945678901', acompanantes: 3, mesa: 5,  fecha: '2026-11-23', servicio: 'Almuerzo', descripcion: 'Sin gluten',             eliminado: false },
    { id: 5,  nombres: 'Elena',  apellidos: 'Santos',    correo: 'elena.santos@email.com',  celular: '956789012', acompanantes: 2, mesa: 9,  fecha: '2026-11-24', servicio: 'Cena',     descripcion: '',                       eliminado: false },
    { id: 6,  nombres: 'Javier', apellidos: 'Moreno',    correo: 'javier.moreno@email.com', celular: '967890123', acompanantes: 5, mesa: 10, fecha: '2026-11-25', servicio: 'Cena',     descripcion: 'Cumpleaños',             eliminado: false },
    { id: 7,  nombres: 'Lucía',  apellidos: 'Fernández', correo: 'lucia.fernandez@email.com',celular: '978901234', acompanantes: 2, mesa: 4,  fecha: '2026-11-26', servicio: 'Almuerzo', descripcion: 'Vegetariana',            eliminado: false },
    { id: 8,  nombres: 'Pedro',  apellidos: 'Díaz',      correo: 'pedro.diaz@email.com',    celular: '989012345', acompanantes: 6, mesa: 1,  fecha: '2026-11-27', servicio: 'Cena',     descripcion: '',                       eliminado: false },
    { id: 9,  nombres: 'Sofía',  apellidos: 'Álvarez',   correo: 'sofia.alvarez@email.com', celular: '990123456', acompanantes: 2, mesa: 6,  fecha: '2026-11-28', servicio: 'Almuerzo', descripcion: 'Alergia a frutos secos', eliminado: false },
    { id: 10, nombres: 'Diego',  apellidos: 'Romero',    correo: 'diego.romero@email.com',  celular: '901234567', acompanantes: 3, mesa: 8,  fecha: '2026-11-29', servicio: 'Cena',     descripcion: '',                       eliminado: false }
  ];

  // Variable correcta
  reservaEditando: Reserva | null = null;

  guardarReserva(reserva: Reserva): void {
    if (reserva.id === 0) {
      // CREATE
      const nuevoId = Math.max(...this.reservas.map(r => r.id), 0) + 1;
      this.reservas.push({ ...reserva, id: nuevoId });
    } else {
      // UPDATE
      const idx = this.reservas.findIndex(r => r.id === reserva.id);
      if (idx !== -1) this.reservas[idx] = reserva;
    }
    this.reservaEditando = null;
  }

  editarReserva(reserva: Reserva): void {
    // Pasamos una copia de la reserva
    this.reservaEditando = { ...reserva };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminarReserva(id: number): void {
    // DELETE (Borrado lógico)
    const r = this.reservas.find(x => x.id === id);
    if (r) r.eliminado = true;
  }

  restaurarReserva(id: number): void {
    // RESTORE
    const r = this.reservas.find(x => x.id === id);
    if (r) r.eliminado = false;
  }

  cancelarEdicion(): void {
    // CORREGIDO: reservaEditando (con "o" al final)
    this.reservaEditando = null;
  }
}