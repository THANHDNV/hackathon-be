import { Min, IsString } from "class-validator"

export class SignMessageDto {
  @IsString()
  recipientAddress!: string

  @Min(0)
  amount!: number

  @Min(0)
  nonce!: number
}
