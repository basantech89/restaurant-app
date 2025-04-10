import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import * as when from '../steps/when.mjs'
import * as teardown from '../steps/teardown.mjs'
import * as given from '../steps/given.mjs'

describe('Given an authenticated user', () => {
  let user

  beforeAll(async () => {
    user = await given.an_authenticated_user()
  })

  afterAll(async () => {
    await teardown.an_authenticated_user(user)
  })

  describe(`When we invoke the POST /restaurants/search endpoint with theme 'cartoon'`, () => {
    it(`Should return an array of 4 restaurants`, async () => {
      const res = await when.we_invoke_search_restaurants('cartoon', user)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveLength(4)

      for (const restaurant of res.body) {
        expect(restaurant).toHaveProperty('name')
        expect(restaurant).toHaveProperty('image')
      }
    })
  })
})
