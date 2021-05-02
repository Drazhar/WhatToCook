import "jest"
import { getRandomInt } from "@/utils/utilities"

describe("GetRandomInt", () => {
  test("Returns a number less than inputted", () => {
    const randomInt = getRandomInt(2)
    expect(randomInt).toBeLessThan(2)
    expect(randomInt).toBeGreaterThanOrEqual(0)
  })

  test("Nearly equal distribution of values", () => {
    const range = 10
    const loopCount = 100000
    const count = new Array(range).fill(0)
    for (let i = 0; i < loopCount; i++) {
      const randomInt = getRandomInt(range)
      count[randomInt]++
    }
    for (let i = 0; i < count.length; i++) {
      expect(count[i] / loopCount).toBeCloseTo(1 / range, 2)
    }
  })
})
