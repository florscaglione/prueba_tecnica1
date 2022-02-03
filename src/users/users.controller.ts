import {
  Controller,
  Post,
  Body,
  //UsePipes,
  //ValidationPipe,
  //ParseArrayPipe,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} //para que haga uso de usersService, llamado por inyeccion de dependencias (funciona porque en el modulo lo declaramos como un provider)

  /*   // Endpoint para crear un usuario
    @Post('create')
    create(
      @Body(new ParseArrayPipe({ items: CreateUserDto })) //esto VALIDA y lee datos
      createUserDto: CreateUserDto[],
    ) {
      //return this.accountService.createAccount(body); // createAccount procesa los datos
      console.log(createUserDto);
      return createUserDto;
    } */

  // Endpoint para crear un usuario
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto); //llama a la funcion "create" del servicio
  }

  // Endpoint para obtener todos los usuarios
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // Endpoint para obtener un solo usuario
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findUser(id);
  }

  // Endpoint para modificar telefonos de un usuario (patch para modificaciones parciales)
  @Patch(':id')
  async updateContacts(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUserContacts(id, updateUserDto);
    //return `This action updates a #${id} user`;
  }
}
