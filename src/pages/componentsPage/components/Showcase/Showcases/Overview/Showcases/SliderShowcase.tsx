import React from 'react'
import { useSliderState } from '@yandex-lego/components/Slider/desktop/bundle'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

// const Slider = getWrappedComponent('Slider');

export const SliderShowcase = () => {
  const state1 = useSliderState({ value: [20] })
  const state2 = useSliderState({ value: [20, 50] })

  const state3 = useSliderState({ value: [20] })
  const state4 = useSliderState({ value: [20, 50] })

  const state5 = useSliderState({ value: [20] })
  const state6 = useSliderState({ value: [20, 50] })

  const state7 = useSliderState({ value: [20] })
  const state8 = useSliderState({ value: [20, 50] })

  const state9 = useSliderState({ value: [20] })
  const state10 = useSliderState({ value: [20, 50] })

  return (
    <>
      <Headline>Slider</Headline>
      {/* <Slider view="default" {...state1} />
      <Slider view="default" {...state2} />
      <Slider filled view="default" {...state3} />
      <Slider filled view="default" {...state4} />
      <Slider reverse filled view="default" {...state5} />
      <Slider reverse filled view="default" {...state6} />
      <Slider filled step={25} view="default" {...state7} />
      <Slider filled step={25} view="default" {...state8} />
      <Slider filled step={20} showTicks showTickValues view="default" {...state9} />
      <Slider filled showTicks showTickValues step={20} view="default" {...state10} /> */}
    </>
  )
}
