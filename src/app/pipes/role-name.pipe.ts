import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleName',
  standalone: true
})
export class RoleNamePipe implements PipeTransform {

  transform(roleId: number | undefined): string {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Receptionist';
      default: return '';
    }
  }

}
