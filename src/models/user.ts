import { prop, getModelForClass } from '@typegoose/typegoose'

export class User {
  @prop({
    unique: true,
  })
  public address!: string;

  @prop({
    default: '0'
  })
  public balance?: string;

  @prop({
    default: 0
  })
  public point?: number;
}

const UserModel = getModelForClass(User)

export default UserModel
