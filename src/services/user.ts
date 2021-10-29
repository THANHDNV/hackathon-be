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
    const foundUser: User = (await this._findUserByAddress(address)).toObject()
    return foundUser
  }

  private async _findUserByAddress(address: string) {
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
    const user: User = (await this._createUser(userData)).toObject()
    return user
  }

  private async _createUser(userData: UserCreateDto) {
    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data")
    }

    const foundUser = await this.userModel.findOne({
      address: userData.address
    })

    if (foundUser) {
      throw new HttpException(409, "This address has been used")
    }

    const newUser = await this.userModel.create(userData)

    return newUser
  }

  public async updateUser(address: string, userData: UserUpdateDto) {
    const user: User = (await this._updateUser(address, userData)).toObject()

    return user
  }

  private async _updateUser(address: string, userData: UserUpdateDto) {
    if (isEmpty(address)) {
      throw new HttpException(400, "This is not an address")
    }

    if (isEmpty(userData)) {
      throw new HttpException(400, "Not enough data")
    }

    const foundUser = await this._findUserByAddress(address)

    foundUser.set(pick(userData, [
      "balance",
      "point"
    ]))
    await foundUser.save()
    return foundUser
  }
}
