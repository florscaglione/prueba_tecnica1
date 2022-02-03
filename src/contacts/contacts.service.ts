import { Injectable } from '@nestjs/common';
import { Contacts } from './contacts.interface';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];

  async getContacts(): Promise<Contacts[]> {
    return this.contacts;
  }

  async saveContact(contactDto: CreateContactDto): Promise<Contacts> {
    const newContact = {
      contactName: contactDto.contactName,
      phone: contactDto.phone,
    };
    this.contacts.push(newContact);
    return newContact;
  }
}
