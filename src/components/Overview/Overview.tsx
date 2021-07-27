import React, { createElement, ComponentType } from 'react'

import { AttachShowcase } from './Showcases/AttachShowcase'
import { BadgeShowcase } from './Showcases/BadgeShowcase'
import { ButtonGroupShowcase } from './Showcases/ButtonGroupShowcase'
import { ButtonShowcase } from './Showcases/ButtonShowcase'
import { CheckboxShowcase } from './Showcases/CheckboxShowcase'
import { DividerShowcase } from './Showcases/DividerShowcase'
import { HeaderShowcase } from './Showcases/HeaderShowcase'
import { LinkShowcase } from './Showcases/LinkShowcase'
import { MenuShowcase } from './Showcases/MenuShowcase'
import { MessageBoxShowcase } from './Showcases/MessageBoxShowcase'
import { ProgressShowcase } from './Showcases/ProgressShowcase'
import { RadioboxShowcase } from './Showcases/RadioboxShowcase'
import { RadioButtonShowcase } from './Showcases/RadioButtonShowcase'
import { SliderShowcase } from './Showcases/SliderShowcase'
import { SpinShowcase } from './Showcases/SpinShowcase'
import { TabsMenuShowcase } from './Showcases/TabsMenuShowcase'
import { TextareaShowcase } from './Showcases/TextareaShowcase'
import { TextinputShowcase } from './Showcases/TextinputShowcase'
import { TextShowcase } from './Showcases/TextShowcase'
import { TooltipShowcase } from './Showcases/TooltipShowcase'
import { TumblerShowcase } from './Showcases/TumblerShowcase'
import { UserPicShowcase } from './Showcases/UserPicShowcase'

import './Overview.css'

const componentsMap: Record<string, ComponentType> = {
  attach: AttachShowcase,
  badge: BadgeShowcase,
  button: ButtonShowcase,
  buttonGroup: ButtonGroupShowcase,
  checkbox: CheckboxShowcase,
  divider: DividerShowcase,
  header: HeaderShowcase,
  link: LinkShowcase,
  menu: MenuShowcase,
  messageBox: MessageBoxShowcase,
  progress: ProgressShowcase,
  radiobox: RadioboxShowcase,
  radioButton: RadioButtonShowcase,
  spin: SpinShowcase,
  tabsMenu: TabsMenuShowcase,
  text: TextShowcase,
  textarea: TextareaShowcase,
  textinput: TextinputShowcase,
  tooltip: TooltipShowcase,
  tumbler: TumblerShowcase,
  userPic: UserPicShowcase,
  slider: SliderShowcase,
}

export const Overview: React.FC<{ includes: string[] }> = ({ includes }) => {
  return (
    <div className="Overview">
      {includes
        .filter((componentName) => componentsMap[componentName])
        .map((componentName) => createElement(componentsMap[componentName]))}
    </div>
  )
}
