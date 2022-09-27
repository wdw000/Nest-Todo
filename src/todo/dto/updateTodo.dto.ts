import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class UpdateTodo {
  @IsString()
  readonly todoId: string;

  @IsString()
  readonly content: string;

  @IsDateString()
  readonly endDate: string;

  @IsBoolean()
  readonly important: boolean;
}
