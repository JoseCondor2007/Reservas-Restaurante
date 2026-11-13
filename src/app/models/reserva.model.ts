export interface Reserva {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;             // Nuevo campo
  celular: string;            // Nuevo campo
  acompanantes: number;
  mesa: number;
  fecha: string;              
  servicio: 'Almuerzo' | 'Cena';
  descripcion: string;
  eliminado: boolean;         
}