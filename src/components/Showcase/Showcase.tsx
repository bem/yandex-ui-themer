import React, { useState, useRef, createElement, ComponentType } from 'react'
import { Button } from '@yandex/ui/Button/Button.bundle/desktop'
import { Attach } from '@yandex/ui/Attach/Attach.bundle/desktop'
import { Icon } from '@yandex/ui/Icon/Icon.bundle/desktop'
import { Badge } from '@yandex/ui/Badge/'
import { Checkbox } from '@yandex/ui/Checkbox/Checkbox.bundle/desktop'
import { Divider } from '@yandex/ui/Divider'
import { Link } from '@yandex/ui/Link/Link.bundle/desktop'
import { Menu } from '@yandex/ui/Menu/Menu.bundle/desktop'
import { MessageBox } from '@yandex/ui/MessageBox/MessageBox.bundle/desktop'
import { Progress } from '@yandex/ui/Progress'
import { Radiobox } from '@yandex/ui/Radiobox/Radiobox.bundle/desktop'
import { RadioButton } from '@yandex/ui/RadioButton/RadioButton.bundle/desktop'
import { Spin } from '@yandex/ui/Spin/Spin.bundle/desktop'
import { TabsMenu } from '@yandex/ui/TabsMenu/TabsMenu.bundle/desktop'
import { Text } from '@yandex/ui/Text/Text.bundle/desktop'
import { Textarea } from '@yandex/ui/Textarea/Textarea.bundle/desktop'
import { Textinput } from '@yandex/ui/Textinput/Textinput.bundle/desktop'
import { Tooltip } from '@yandex/ui/Tooltip/Tooltip.bundle/desktop'
import { Tumbler } from '@yandex/ui/Tumbler/Tumbler.bundle/desktop'
import { UserPic } from '@yandex/ui/UserPic/UserPic.bundle/desktop'
import { Slider, useSliderState } from '@yandex/ui/Slider/desktop/bundle';

import { Headline } from '../Headline/Headline'
import './Showcase.css'

const ButtonShowcase = () => {
  const view = ['default', 'action', 'pseudo', 'link', 'clear', 'raised']

  return (
    <>
      <Headline>Button</Headline>
      {view.map((view: any) => {
        return (
          <>
            <p>View {view}</p>
            <div className="Showcase-Item">
              <Button view={view} size="l">
                Button
              </Button>
              <Button view={view} size="m">
                Button
              </Button>
              <Button view={view} size="s">
                Button
              </Button>
              <Button view={view} size="s" disabled>
                Button
              </Button>
              <Button view={view} size="s" checked>
                Button
              </Button>
              <Button view={view} size="s" progress>
                Button
              </Button>
              <Button
                view={view}
                size="s"
                iconLeft={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
                iconRight={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
              >
                Button
              </Button>
              <Button
                view={view}
                size="s"
                icon={(className: string) => (
                  <Icon size="s" type="arrow" direction="left" className={className} />
                )}
              />
            </div>
          </>
        )
      })}
      <div className="Showcase-Item" style={{ whiteSpace: 'normal' }}>
        <Button view="default" size="m">
          Button
        </Button>
        <Text>Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч.</Text>
        <Text>
          Шеф взъярён тчк щипцы с эхом гудбай Жюль. Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф.
          Экс-граф? Плюш изъят. Бьём чуждый цен хвощ!
        </Text>
        <Button view="action" size="m">
          Button
        </Button>
      </div>
    </>
  )
}

const AttachShowcase = () => {
  return (
    <>
      <Headline>Attach</Headline>
      <div className="Showcase-Item">
        <Attach size="l" view="default">
          Select file
        </Attach>
        <Attach size="m" view="default">
          Select file
        </Attach>
        <Attach size="s" view="default">
          Select file
        </Attach>
      </div>
    </>
  )
}

const IconTwo = () => (
  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <path d="M4.5 18a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-3a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zm11 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-3a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5zM19 4H5.78L4.97.758A.998.998 0 0 0 4 0H1a1 1 0 0 0 0 2h2.22l.805 3.222.01.042 1.995 7.98a1 1 0 0 0 1.135.743l11.017-1.837c1.02-.17 1.818-1.11 1.818-2.14V5a1 1 0 0 0-1-1zm-1 6.01c0 .05-.085.157-.146.167L7.746 11.862 6.28 6H18v4.01z" />
  </svg>
)

const BadgeShowcase = () => {
  return (
    <>
      <Headline>Badge</Headline>
      <div
        className="Showcase-Item"
        style={{ display: 'flex', justifyContent: 'space-between', width: 300 }}
      >
        <Badge />

        <Badge content="?" />

        <Badge content={5}>
          <IconTwo />
        </Badge>

        <Button view="default" size="m">
          Закладка
          <Badge color="#0679ff" outlineColor="#0679ff" content={5} style={{ marginLeft: 5 }} />
        </Button>
      </div>
    </>
  )
}

const CheckboxShowcase = () => {
  return (
    <>
      <Headline>Checkbox</Headline>
      <div className="Showcase-Item">
        <Checkbox size="m" view="default" label="Label" checked />
        <Checkbox size="m" view="default" label="Label" />
        <Checkbox size="m" view="default" label="Label" disabled />
        <Checkbox size="m" view="default" label="Label" indeterminate />
        <br />
        <br />
        <Checkbox size="s" view="default" label="Label" checked />
        <Checkbox size="s" view="default" label="Label" />
        <Checkbox size="s" view="default" label="Label" disabled />
        <Checkbox size="s" view="default" label="Label" indeterminate />
        <br />
        <br />
        <Checkbox size="s" view="outline" label="Label" checked />
        <Checkbox size="s" view="outline" label="Label" />
        <Checkbox size="s" view="outline" label="Label" disabled />
        <Checkbox size="s" view="outline" label="Label" indeterminate />
        <br />
        <br />
        <Checkbox size="m" view="outline" label="Label" checked />
        <Checkbox size="m" view="outline" label="Label" />
        <Checkbox size="m" view="outline" label="Label" disabled />
        <Checkbox size="m" view="outline" label="Label" indeterminate />
      </div>
    </>
  )
}

const DividerShowcase = () => {
  return (
    <>
      <Headline>Divider</Headline>
      <div className="Showcase-Item">
        Content
        <Divider style={{ margin: '8px 0' }}>Section</Divider>
        Content
      </div>
    </>
  )
}

const LinkrShowcase = () => {
  return (
    <>
      <Headline>Link</Headline>
      <div className="Showcase-Item">
        <Link href="https://ya.ru" view="default">
          Ссылка
        </Link>
        <br />
        <Link view="default" pseudo>
          Ссылка
        </Link>
        <br />
        <Link href="https://ya.ru" view="default" disabled>
          Ссылка
        </Link>
      </div>
    </>
  )
}

const MenuShowcase = () => {
  const items = [
    { value: 'a', content: 'Каждый' },
    { value: 'b', content: 'Охотник' },
    {
      items: [
        { value: 'c', content: 'Желает', disabled: true },
        { value: 'd', content: 'Знать' },
        { value: 'e', content: 'Где' },
      ],
    },
  ]

  const [value, setValue] = useState('a')

  return (
    <>
      <Headline>Menu</Headline>
      <div className="Showcase-Item">
        <Menu
          size="m"
          theme="normal"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
        <Menu
          size="s"
          theme="normal"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
      </div>
      <div className="Showcase-Item">
        <Menu
          size="m"
          view="default"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
        <Menu
          size="s"
          view="default"
          items={items}
          value={value}
          onChange={(event: any) => setValue(event.target.value)}
        />
      </div>
    </>
  )
}

const MessageBoxrShowcase = () => {
  return (
    <>
      <Headline>MessageBox</Headline>
      <div className="Showcase-Item">
        <div style={{ backgroundColor: '#fff', padding: '16px' }}>
          <MessageBox
            onClose={() => null}
            view="default"
            size="m"
            actions={
              <>
                <Button view="clear" size="s">
                  Отклонить
                </Button>
                <Button view="action" size="s">
                  Принять
                </Button>
              </>
            }
          >
            Новая почта с классными темами!
          </MessageBox>
        </div>
        <div style={{ backgroundColor: '#000', padding: '16px' }}>
          <MessageBox
            onClose={() => null}
            view="inverse"
            size="m"
            actions={
              <>
                <Button view="clear" size="s">
                  Отклонить
                </Button>
                <Button view="action" size="s">
                  Принять
                </Button>
              </>
            }
          >
            Новая почта с классными темами!
          </MessageBox>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '16px' }}>
          <MessageBox
            onClose={() => null}
            view="promo"
            size="m"
            actions={
              <>
                <Button view="action" size="s">
                  Подробнее
                </Button>
              </>
            }
          >
            Новая почта с классными темами!
          </MessageBox>
        </div>
      </div>
    </>
  )
}

const ProgresShowcase = () => {
  return (
    <>
      <Headline>Progres</Headline>
      <div className="Showcase-Item">
        <Progress timing="linear" value={50} maxValue={100} />
      </div>
    </>
  )
}

const RadioButtonShowcase = () => {
  const options = [
    { value: 'a', children: 'Option A' },
    { value: 'b', children: 'Option B' },
    { value: 'c', children: 'Option C' },
  ]

  return (
    <>
      <Headline>RadioButton</Headline>
      <div className="Showcase-Item">
        <RadioButton size="l" view="default" value="a" options={options} />
        <br />
        <br />
        <RadioButton size="m" view="default" value="a" options={options} />
        <br />
        <br />
        <RadioButton size="s" view="default" value="a" options={options} />
      </div>
    </>
  )
}

const RadioboxShowcase = () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C (disabled)', value: 'c', disabled: true },
  ]

  return (
    <>
      <Headline>Radiobox</Headline>
      <div className="Showcase-Item">
        <Radiobox size="m" view="default" value="a" options={options} />
        <br />
        <Radiobox size="s" view="default" value="a" options={options} />
      </div>
      <div className="Showcase-Item">
        <Radiobox size="m" view="outline" value="a" options={options} />
        <br />
        <Radiobox size="s" view="outline" value="a" options={options} />
      </div>
    </>
  )
}

const SpinShowcase = () => {
  return (
    <>
      <Headline>Spin</Headline>
      <div className="Showcase-Item">
        <Spin progress view="default" size="l" />
        <Spin progress view="default" size="m" />
        <Spin progress view="default" size="s" />
        <Spin progress view="default" size="xs" />
        <Spin progress view="default" size="xxs" />
      </div>
    </>
  )
}

const TabsMenuShowcase = () => {
  return (
    <>
      <Headline>TabsMenu</Headline>
      <div className="Showcase-Item">
        <TabsMenu
          size="m"
          view="default"
          layout="horiz"
          tabs={[
            { id: 'search', content: 'Поиск' },
            { id: 'images', content: 'Картинки' },
            { id: 'video', content: 'Видео' },
          ]}
          activeTab={'search'}
        />

        <br />
        <TabsMenu
          size="s"
          view="default"
          layout="horiz"
          tabs={[
            { id: 'search', content: 'Поиск' },
            { id: 'images', content: 'Картинки' },
            { id: 'video', content: 'Видео' },
          ]}
          activeTab={'search'}
        />
      </div>
    </>
  )
}

const TextShowcase = () => {
  return (
    <>
      <Headline>Text</Headline>
      <div className="Showcase-Item">
        <Text as="div">
          Миссия Яндекса — помогать людям решать задачи и достигать своих целей в жизни.
        </Text>
      </div>
    </>
  )
}

const TextareaShowcase = () => {
  const [value1, setValue1] = useState('')

  return (
    <>
      <Headline>Textarea</Headline>
      <div className="Showcase-Item">
        <Textarea
          hasClear
          size="m"
          view="default"
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
          onClearClick={() => setValue1('')}
        />
        <br />
        <br />
        <Textarea
          hasClear
          size="s"
          view="default"
          value={value1}
          onChange={(event) => setValue1(event.target.value)}
          onClearClick={() => setValue1('')}
        />
      </div>
    </>
  )
}

const TextinputShowcase = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')
  const [value4, setValue4] = useState('')

  return (
    <>
      <Headline>Textinput</Headline>
      <div className="Showcase-Item">
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="m"
            view="default"
            value={value1}
            onChange={(event) => setValue1(event.target.value)}
            onClearClick={() => setValue1('')}
          />
        </div>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="s"
            view="default"
            value={value2}
            onChange={(event) => setValue2(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
      </div>
      <div className="Showcase-Item">
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            size="s"
            label="Label"
            view="material"
            value={value3}
            onChange={(event) => setValue3(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
        <div style={{ padding: 4 }}>
          <Textinput
            hasClear
            label="Label"
            size="m"
            view="material"
            value={value4}
            onChange={(event) => setValue4(event.target.value)}
            onClearClick={() => setValue2('')}
          />
        </div>
      </div>
    </>
  )
}

const TooltipShowcase = () => {
  const [visible1, setVisible1] = useState(true)
  const [visible2, setVisible2] = useState(true)
  const [visible3, setVisible3] = useState(true)
  const [visible4, setVisible4] = useState(true)
  const [visible5, setVisible5] = useState(true)
  const [visible6, setVisible6] = useState(true)
  const anchorRef1 = useRef<HTMLDivElement>(null)
  const anchorRef2 = useRef<HTMLDivElement>(null)
  const anchorRef3 = useRef<HTMLDivElement>(null)
  const anchorRef4 = useRef<HTMLDivElement>(null)
  const anchorRef5 = useRef<HTMLDivElement>(null)
  const anchorRef6 = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Headline>Tooltip</Headline>
      <div className="Showcase-Item">
        <div style={{ position: 'relative', display: 'flex', height: 96 }} ref={scopeRef}>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef1}
              size="m"
              view="default"
              onClick={() => setVisible1(!visible1)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef2}
              size="m"
              view="default"
              onClick={() => setVisible2(!visible2)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef3}
              size="m"
              view="default"
              onClick={() => setVisible3(!visible3)}
            >
              Target
            </Button>
          </div>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="s"
            anchor={anchorRef1}
            scope={scopeRef}
            visible={visible1}
          >
            Size small
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="m"
            anchor={anchorRef2}
            scope={scopeRef}
            visible={visible2}
          >
            Size medium
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="l"
            anchor={anchorRef3}
            scope={scopeRef}
            visible={visible3}
          >
            Size large
          </Tooltip>
        </div>
      </div>
      <div className="Showcase-Item">
        <div style={{ position: 'relative', display: 'flex', height: 96 }} ref={scopeRef}>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef4}
              size="m"
              view="default"
              onClick={() => setVisible4(!visible4)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef5}
              size="m"
              view="default"
              onClick={() => setVisible5(!visible5)}
            >
              Target
            </Button>
          </div>
          <div style={{ marginLeft: 32, marginRight: 32 }}>
            <Button
              innerRef={anchorRef6}
              size="m"
              view="default"
              onClick={() => setVisible6(!visible6)}
            >
              Target
            </Button>
          </div>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="s"
            state="warning"
            anchor={anchorRef4}
            scope={scopeRef}
            visible={visible4}
          >
            Size small
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="m"
            state="success"
            anchor={anchorRef5}
            scope={scopeRef}
            visible={visible5}
          >
            Size medium
          </Tooltip>
          <Tooltip
            hasTail
            direction="bottom-center"
            view="default"
            size="l"
            state="alert"
            anchor={anchorRef6}
            scope={scopeRef}
            visible={visible6}
          >
            Size large
          </Tooltip>
        </div>
      </div>
    </>
  )
}

const TumblerShowcase = () => {
  const [checked1, setChecked1] = useState(true)
  const [checked2, setChecked2] = useState(false)

  return (
    <>
      <Headline>Tumbler</Headline>
      <div className="Showcase-Item">
        <>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="m"
              view="default"
              checked={checked1}
              onChange={() => setChecked1(!checked1)}
              labelBefore="labelBefore"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="m"
              view="default"
              checked
              disabled
              onChange={() => {}}
              labelAfter="disabled check"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="s"
              view="default"
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              labelAfter="labelAfter"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Tumbler
              size="l"
              view="default"
              checked={false}
              disabled
              onChange={() => {}}
              labelBefore={
                <svg
                  aria-label="labelBefore"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 7.003a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5H12v-2a4 4 0 0 0-8 0v2h-.5zm2.5-2a2 2 0 1 1 4 0V7H6V5.003z"
                    fill="currentColor"
                  />
                </svg>
              }
              labelAfter="disabled"
            />
          </div>
        </>
      </div>
    </>
  )
}

const UserPicShowcase = () => {
  return (
    <>
      <Headline>UserPic</Headline>
      <div className="Showcase-Item">
        <>
          <div style={{ marginRight: '20px', display: 'inline-block' }}>
            <UserPic plus avatarId="43978/351415393-30646433" size="m" />
          </div>
          <div style={{ marginRight: '20px', display: 'inline-block' }}>
            <UserPic avatarId="0/0-0" hasCamera size="m" />
          </div>
          <div style={{ marginRight: '20px', display: 'inline-block' }}>
            <UserPic plus avatarId="0/0-0" hasCamera size="s" />
          </div>
          <div style={{ marginRight: '20px', display: 'inline-block' }}>
            <UserPic
              lodpiUrl="https://jing.yandex-team.ru/files/kri0-gen/halp_orange.jpg"
              size="s"
            />
          </div>
        </>
      </div>
    </>
  )
}

const SliderShowcase = () => {
  const state1 = useSliderState({ value: [20] });
  const state2 = useSliderState({ value: [20, 50] });

  const state3 = useSliderState({ value: [20] });
  const state4 = useSliderState({ value: [20, 50] });

  const state5 = useSliderState({ value: [20] });
  const state6 = useSliderState({ value: [20, 50] });

  const state7 = useSliderState({ value: [20] });
  const state8 = useSliderState({ value: [20, 50] });

  const state9 = useSliderState({ value: [20] });
  const state10 = useSliderState({ value: [20, 50] });


  return (
    <>
      <Headline>Slider</Headline>
      <Slider view="default" {...state1} />
      <Slider view="default" {...state2} />
      <Slider filled view="default" {...state3} />
      <Slider filled view="default" {...state4} />
      <Slider reverse filled view="default" {...state5} />
      <Slider reverse filled view="default" {...state6} />
      <Slider filled step={25} view="default" {...state7} />
      <Slider filled step={25} view="default" {...state8} />
      <Slider filled step={20} showTicks showTickValues view="default" {...state9} />
      <Slider filled showTicks showTickValues step={20} view="default" {...state10} />
    </>
  );
}

const componentsMap: Record<string, ComponentType> = {
  button: ButtonShowcase,
  attach: AttachShowcase,
  badge: BadgeShowcase,
  checkbox: CheckboxShowcase,
  divider: DividerShowcase,
  link: LinkrShowcase,
  menu: MenuShowcase,
  messageBox: MessageBoxrShowcase,
  progress: ProgresShowcase,
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
  slider: SliderShowcase
}

export const Showcase: React.FC<{ includes: string[] }> = ({ includes }) => {
  return (
    <div className="Showcase">
      {includes
        .filter((componentName) => componentsMap[componentName])
        .map((componentName) => createElement(componentsMap[componentName]))}
    </div>
  )
}
