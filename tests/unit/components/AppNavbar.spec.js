import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AppNavbar from '@/components/AppNavbar.vue'
import { expect } from 'chai'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AppNavbar.vue', () => {
  let store = null

  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
  })
  it('renders a div', () => {
    const wrapper = shallowMount(AppNavbar, {
      store,
      localVue,
      stubs: ['router-link', 'font-awesome-icon']
    })
    expect(wrapper.contains('div')).to.equal(true)
  })
  it('has a word "Signin"', () => {
    const wrapper = shallowMount(AppNavbar, {
      store,
      localVue,
      stubs: ['router-link', 'font-awesome-icon']
    })
    expect(wrapper.text().includes('Signin')).to.equal(true)
  })
})
