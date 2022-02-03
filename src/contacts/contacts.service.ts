import { Injectable } from '@nestjs/common';
import { Contacts } from './contacts.interface';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactModel: any;

  async getContacts(id: string): Promise<Contacts[]> { //FALLA EL ID: COMO BUSCO EL ID DEL ATRIBUTO USERSTARTUP DEL MODELO CONTACTS??
    //return this.contacts;
    return this.contactModel.findById(id).lean() as unknown as Promise<
      Contacts[]
    >;
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
