import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'

describe('App.vue', () => {
  it('has a created hook', () => {
    expect(typeof App.created).to.equal('function')
  })
})
