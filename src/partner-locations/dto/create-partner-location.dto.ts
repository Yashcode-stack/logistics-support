import { IsString } from 'class-validator';

export class CreatePartnerLocationDto {
  @IsString()
  pincode: string;

  @IsString()
  delieveryPartnerId: string;
}
