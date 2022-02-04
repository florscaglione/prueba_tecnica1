import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  contactName: string;

  @IsNotEmpty()
  phone: string;
}
