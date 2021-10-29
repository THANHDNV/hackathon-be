import { Routes } from "@/interfaces/routes"
import UserService from "@/services/user"
import { UserCreateDto, UserUpdateDto } from '@/dtos/user'
import { Router } from "express"
import { nextTick } from "process"

export default class UserRoute implements Routes {
  public path = '/user'
  public router = Router()

  private userService = new UserService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/:address', async (req, res, next) => {
      try {
        const foundUser = await this.userService.findUserByAddress(req.params.address)
        return res.status(200).json({
          data: foundUser,
          message: 'findOne'
        })
      } catch (error) {
        next(error)
      }
    })

    this.router.post('/', async (req, res, next) => {
      try {
        const userData: UserCreateDto = req.body
        const user = await this.userService.createUser(userData)

        return res.status(200).json({
          data: user,
          message: 'createOne'
        })
      } catch (error) {
        next(error)
      }

    })

    this.router.put('/:address', async (req, res, next) => {
      try {
        const address = req.params.address
        const userData: Pick<UserUpdateDto, "balance" | "point"> = req.body
        const user = await this.userService.updateUser(address, userData)

        return res.status(200).json({
          data: user,
          message: 'updateOne'
        })
      } catch (error) {
        next(error)
      }
    })
  }
}