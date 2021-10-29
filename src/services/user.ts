import { HttpException } from "@/exceptions/HttpException";
import UserModel, { User } from "@models/user";
import { UserCreateDto, UserUpdateDto } from '@/dtos/user'
import { isEmpty, pick } from 'lodash'

export default class UserService {
  public userModel = UserModel;

  public async findUserById(id: string) {
    if (isEmpty(id)) {
      throw new HttpException(400, "You're not userId")
    }

    const foundUser = await this.userModel.findById(id)
    if (!foundUser) {
      throw new HttpException(409, "Not a user")
    }

    return foundUser
  }

  public async findUserByAddress(address: string) {
    if (isEmpty(address)) {
      throw new HttpException(400, "This is not an address")
    }

    const foundUser = await this.userModel.findOne({
      address
    })

    if (!foundUser) {
      throw new HttpException(409, "Not a user")
    }

    return foundUser
  }

  public async createUser(userData: UserCreateDto) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data")
    }

    const foundUser = await this.userModel.findOne({
      address: userData.address
    })

    if (foundUser) {
      throw new HttpException(409, "This address has been used")
    }

    const newUser: User = await this.userModel.create(userData)

    return newUser
  }

  public async updateUser(userData: UserUpdateDto) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data")
    }

    const foundUser = await this.findUserByAddress(userData.address)

    foundUser.set(pick(userData, [
      "balance",
      "point"
    ]))
    await foundUser.save()
    return foundUser
  }
}
