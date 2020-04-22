import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

describe('Breadcrumb', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Breadcrumb, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
