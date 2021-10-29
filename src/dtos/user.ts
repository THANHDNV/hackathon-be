import { IsString, Min } from 'class-validator'

export class UserCreateDto {
  @IsString()
  public address!: string;

  @Min(0)
  public balance!: number
}

export class UserUpdateDto {
  @Min(0)
  public balance?: number;

  @Min(0)
  public point?: number;
}
