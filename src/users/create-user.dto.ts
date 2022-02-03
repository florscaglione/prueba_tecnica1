import { IsNotEmpty, IsOptional } from 'class-validator';
import { Users } from './users.interface';

export class CreateUserDto implements Users {
  //con implements indicamos que la clase CreateUsersDto debe implementar lo que sea que venga en Users (para hacerlos compatibles) (es decir, que esa clase debe usar esa interfaz)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  phone: string;
}
