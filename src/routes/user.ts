import { Routes } from "@/interfaces/routes"
import UserService from "@/services/user"
import { UserCreateDto, UserUpdateDto } from '@/dtos/user'
import { Router } from "express"

export default class UserRoute implements Routes {
  public path = '/user'
  public router = Router()

  private userService = new UserService()

  contructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/:address', async (req, res) => {
      const foundUser = await this.userService.findUserByAddress(req.params.address)
      return res.status(200).json({
        data: foundUser,
        message: 'findOne'
      })
    })

    this.router.post('/', async (req, res) => {
      const userData: UserCreateDto = req.body
      const user = await this.userService.createUser(userData)

      return res.status(200).json({
        data: user,
        message: 'createOne'
      })
    })

    this.router.put('/:address', async (req, res) => {
      const address = req.params.address
      const userData: Pick<UserUpdateDto, "balance" | "point"> = req.body
      const user = await this.userService.updateUser(address, userData)

      return res.status(200).json({
        data: user,
        message: 'updateOne'
      })
    })
  }
}