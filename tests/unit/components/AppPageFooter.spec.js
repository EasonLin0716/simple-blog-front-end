import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import AppPageFooter from '@/components/AppPageFooter.vue'

describe('AppPageFooter', () => {
  it('renders a div', () => {
    const wrapper = mount(AppPageFooter)
    expect(wrapper.contains('div')).to.equal(true)
  })
  it('has words "Make this site better"', () => {
    const wrapper = mount(AppPageFooter)
    expect(wrapper.text().includes('Make this site better')).to.equal(true)
  })
})
