import { shallow } from '@vue/test-utils'

import BaseCard from '@/components/BaseCard.vue'

describe('BaseCard', () => {
  desribe('Attributes', () => {
    describe('Card with extra class and background image', () => {
      let wrapper: any

      beforeEach(() => {
        wrapper = shallow(BaseCard, {
          propsData: {
            extraClass: 'card--active',
            background: 'image.png'
          }
        })
      })

      it('should render class ["card", "card--active"]', () => {
        expect(wrapper.find({ref: 'card'}).classes()).toEqual(['card', 'card--active'])
      })

      it('should render attribute style {background-image: "url(image.png)"}', () => {
        expect(wrapper.attributes().style).toEqual('background-image: url(image.png);')
      })
    })

    describe('Card with no classes and no background images', () => {
      let wrapper: any

      beforeEach(() => {
        wrapper = shallow(BaseCard)
      })

      it('should render class ["card"]', () => {
        expect(wrapper.find({ref: 'card'}).classes()).toEqual(['card'])
      })

      it('should render attribute style {background-image: "url(image.png)"}', () => {
        expect(wrapper.attributes().style).toEqual(undefined)
      })
    })
  })
})
