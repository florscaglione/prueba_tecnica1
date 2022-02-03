import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './create-contact.dto';
import { Contacts } from './contacts.interface';

@Controller('contacts')   //PROBAR EN POSTMAN!!! Habra que pasarle en la ruta el id del usuario del q quiero ver la lista d contactos,no??
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('save-contact')
  async createContact(@Body() contact: CreateContactDto): Promise<Contacts> {
    return this.contactsService.saveContact(contact);
  }

  @Get(':id')
  async getContacts(@Param('id') id: string): Promise<Contacts[]> {
    return this.contactsService.getContacts(id);
  }
}
