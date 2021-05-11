import { shallowMount } from "@vue/test-utils"
import RecipeCard from "@/components/RecipeCard.vue"

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message"
    const wrapper = shallowMount(RecipeCard, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
