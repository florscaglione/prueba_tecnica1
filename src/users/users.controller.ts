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
  ParseArrayPipe,
} from '@nestjs/common';
import { Contact } from 'src/contacts/contacts.model';
import { CreateContactDto } from 'src/contacts/create-contact.dto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {} //para que haga uso de usersService, llamado por inyeccion de dependencias (funciona porque en el modulo lo declaramos como un provider)

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

  // Endpoint para Guardar/Actualizar los contactos de la agenda un usuario (patch para modificaciones parciales)
  @Patch(':id/update-contacts')
  async updateContacts(
    @Param('id') id: string,
    @Body(new ParseArrayPipe({ items: CreateContactDto }))
    contacts: CreateContactDto[],
  ): Promise<User> {
    return await this.usersService.updateUserContacts(id, contacts);
  }
 
  // Endpoint para obtener los contactos comunes entre dos usuarios
  @Get(':idLeft/:idRight')
  async getUserContacts(
    @Param('idLeft') idLeft: string,
    @Param('idRight') idRight: string,
  ) {
    return await this.usersService.findContactsInCommon(idLeft, idRight);
  }
}
