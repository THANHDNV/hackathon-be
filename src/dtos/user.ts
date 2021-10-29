import { IsString, Min, IsNumber } from 'class-validator'

export class UserCreateDto {
  @IsString()
  public address!: string;

  @IsNumber()
  @Min(0)
  public balance!: string
}

export class UserUpdateDto {
  @IsNumber()
  @Min(0)
  public balance?: string;

  @Min(0)
  public point?: number;
}

export class CheckHasEnoughBalance {
  @IsString()
  recipientAddress!: string

  @IsNumber()
  @Min(0)
  amount!: string
}
