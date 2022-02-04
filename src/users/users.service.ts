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
import { CreateContactDto } from 'src/contacts/create-contact.dto';
import { Contact, ContactDocument } from 'src/contacts/contacts.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

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
    //NO FUNCIONA EL MENSAJE DE ERROR SI NO ENCUENTRA AL USUARIO  -- PENDIENTE!
    //const user = this.userModel.findById(id);
    //if (!user) {
    //  throw new NotFoundException('Usuario no encontrado');
    //}
    return this.userModel.findById(id).lean() as unknown as Promise<User>; //lean devuelve un objeto de JS en lugar de una instacia de mongo (es menos pesado que .exec())
  }

  // Funcion para encontrar los contactos comunes de dos usuarios:
  async findContactsInCommon(idLeft: string, idRight: string) {
    const userLeft = await this.findUser(idLeft);
    const userRight = await this.findUser(idRight);
    const commonContacts = [];
    for (let index = 0; index < userLeft.contacts.length; index++) {
      const userLeftContactId = userLeft.contacts[index];
      const userLeftContact = await this.contactModel
        .findById(userLeftContactId)
        .exec();
      for (let j = 0; j < userRight.contacts.length; j++) {
        const userRightContactId = userRight.contacts[j];
        const userRightContact = await this.contactModel
          .findById(userRightContactId)
          .exec();

        if (userRightContact.phone === userLeftContact.phone) {
          commonContacts.push(userRightContact);
        }
      }
    }
    return commonContacts;
  }

  async findContactInContacts(
    contactInRequest: CreateContactDto,
    contactsInUser: Contact[],
  ) {
    for (let index = 0; index < contactsInUser.length; index++) {
      const contact = contactsInUser[index];
      const fullContact = await this.contactModel.findById(contact).exec();
      if (fullContact && contactInRequest.phone === fullContact.phone) {
        return contact;
      }
    }
    return null;
  }

  //Funcion para guardar/actualizar los contactos de un usuario:
  async updateUserContacts(
    id: string,
    contacts: CreateContactDto[],
  ): Promise<User> {
    console.log('updateUserContacts');
    const user = await this.userModel.findById(id).exec();

    for (let index = 0; index < contacts.length; index++) {
      const contactInRequest = contacts[index];
      const contactId = await this.findContactInContacts(
        contactInRequest,
        user.contacts,
      );
      if (contactId) {
        //console.log('Hi!');
        //console.log(contactId);
        //console.log(contactInRequest.contactName);
        this.contactModel
          .findByIdAndUpdate(contactId, {
            contactName: contactInRequest.contactName,
          })
          .exec();
      } else {
        const newContact = new Contact();
        newContact.contactName = contactInRequest.contactName;
        newContact.phone = contactInRequest.phone;
        const contactModel = new this.contactModel(newContact);
        contactModel.save();
        user.contacts.push(contactModel);
      }
    }
    return await user.save();
  }

  //Funcion que pide todos los contactos de un usuario: ???
  async getUserContacts(id: string) {
    const user = await this.findUser(id);
    const Contacts = [];
    for (let index = 0; index < user.contacts.length; index++) {
      const userContactId = user.contacts[index];
      const userContact = await this.contactModel
        .findById(userContactId)
        .exec();
      return Contacts.push(userContact);
    }
    return Contacts;
  }
}
