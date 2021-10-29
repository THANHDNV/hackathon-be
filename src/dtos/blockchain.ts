import { Min, IsString, IsNumber } from "class-validator"

export class SignMessageDto {
  @IsString()
  recipientAddress!: string

  @IsNumber()
  @Min(0)
  amount!: string

  @Min(0)
  nonce!: number
}
