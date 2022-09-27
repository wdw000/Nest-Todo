import { IsString } from 'class-validator';

export class LoginTokenDto {
  @IsString()
  readonly jwt: string;
}
