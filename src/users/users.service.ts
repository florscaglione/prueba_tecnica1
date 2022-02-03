import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
//import { Users } from './users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';

/* @Injectable()
export class UsersService {
  persist(user: CreateUserDto): Users {
    // la funcion persist recibe un user que sera del tipo CreateUsersDto, y devuelve un Users
    // TODO insertar en base de datos
    return user;
  }
} */ //PRIMERAS PRUEBAS

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //Funcion para crear al usuario y guardarlo en la bbdd: --> DESDE EL COTNROLADOR DEBO LLAMAR A ESTA FUNCION (hecho)
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save(); //save devovlerá una instacia de mongo
  }

  //Funcion que pide todos los usuarios que haya en la BBDD:   (devuelve una lista de usuarios [])
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean() as unknown as Promise<User[]>; //si no le pongo lo ultimo da error porque la fcion. devuelve una promesa y lean devuelve otro tipo
  }

  //Funcion para buscar un solo usuario:   (solo devuelve un usuario, no necesito un array)
  async findUser(id: string): Promise<User> {
    //NO ME FUNCIONA EL MENSAJE DE ERROR SI NO ENCUENTRA AL USUARIO  -- ARREGLAR O ELIMINAR!!
    //const user = this.userModel.findById(id);
    //if (!user) {
    //  throw new NotFoundException('Usuario no encontrado');
    //}

    return this.userModel.findById(id).lean() as unknown as Promise<User>; //lean devuelve un objeto de JS en lugar de una instacia de mongo (es menos pesado que .exec())
  }

  //Funcion para modificar un telefono de un usuario:  FUNCIONA (pero no es el endpoint que me piden!!)
  async updateUserContacts(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const toUpdate = await this.userModel.findById(id);
    delete toUpdate.phone;
    const updated = Object.assign(toUpdate, updateUserDto);
    return await updated.save();
  }

  // -------????? MODIFICAR Y HACER (SOLO CAMBIADO EL NOMBRE)
  //Funcion que pide todos los contactos de un usuario:
  async findUserContacts(): Promise<User[]> {
    return this.userModel.find().lean() as unknown as Promise<User[]>; //si no le pongo lo ultimo da error porque la fcion. devuelve una promesa y lean devuelve otro tipo
  }
}
