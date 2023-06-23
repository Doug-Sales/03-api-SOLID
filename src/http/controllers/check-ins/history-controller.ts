import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserChekInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history'

export async function history(request: FastifyRequest, response: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInshistoryUseCase = makeFetchUserChekInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInshistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return response.status(200).send({
    checkIns,
  })
}
