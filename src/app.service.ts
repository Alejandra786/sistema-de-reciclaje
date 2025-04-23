import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getService(): string {
    return (
      'Sistema Reciclaje:\n' +
      'Plataforma de gestión de reciclaje con:\n' +
      '- Usuarios\n' +
      '- Puntos de reciclaje\n' +
      '- Materiales\n' +
      '- Roles\n' +
      '- Recompensas\n' +
      '- Puntajes\n' +
      '- Impactos ambientales\n' +
      '- Donaciones\n' +
      '\nHecho por:\n' +
      '- Vargas Méndez Alejandra\n' +
      '- Raúl Cesar Conde Rodríguez\n' +
      '- Romero Gandarillas Alex Fernando\n' +
      '- Fernandez Lazcano Oscar Rolando'
    );
  }
}
