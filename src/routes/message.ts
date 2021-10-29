import { Routes } from '@interfaces/routes'
import { Router } from 'express'
import BlockchainService from '@/services/blockchain'
import { SignMessageDto } from '@/dtos/blockchain'
import UserService from '@/services/user'
import { HttpException } from '@/exceptions/HttpException'

export default class MessageRoute implements Routes {
  public path = '/message'
  public router = Router()

  private userService = new UserService()
  private blockchainService = new BlockchainService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post('/sign', async (req, res, next) => {
      try {
        const messageData: SignMessageDto = req.body

        const hasEnough = await this.userService.checkHasEnoughBalance(messageData)

        if (!hasEnough) {
          throw new HttpException(400, "not enough balance")
        }

        const message = await this.blockchainService.signMessage(messageData)
        return res.status(200).json({
          data: { message },
          message: 'signMessage'
        })
      } catch (error) {
        next(error)
      }
    })
  }
}