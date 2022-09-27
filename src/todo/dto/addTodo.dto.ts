import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class AddTodoDto {
  @IsString()
  readonly uid: string;

  @IsString()
  readonly content: string;

  @IsDateString()
  readonly end_date: string;

  @IsDateString()
  readonly startDate: string;

  @IsBoolean()
  readonly important: boolean;
}
