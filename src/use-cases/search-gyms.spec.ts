import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Node.js',
      description: null,
      phone: null,
      latitude: -22.4162708,
      longitude: -46.8209933,
    })

    await gymsRepository.create({
      title: 'Typescript',
      description: null,
      phone: null,
      latitude: -22.4162708,
      longitude: -46.8209933,
    })

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Typescript' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Node.js ${i}`,
        description: null,
        phone: null,
        latitude: -22.4162708,
        longitude: -46.8209933,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Node',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Node.js 21' }),
      expect.objectContaining({ title: 'Node.js 22' }),
    ])
  })
})
