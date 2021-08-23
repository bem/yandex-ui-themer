import React from 'react'
import { Button as ButtonBase } from '@yandex-lego/components/Button'
import { Textinput as TextinputBase, withHasClear } from '@yandex-lego/components/Textinput/desktop'
import { Header, HeaderSearch, HeaderNav, HeaderNavItem } from '@yandex-lego/components/Header/desktop'
import { withViewSearchArrow as withViewSearchArrowButton } from '@yandex-lego/components/Header/Button'
import { withViewSearchArrow as withViewSearchArrowTextinput } from '@yandex-lego/components/Header/Textinput'

import { Headline } from '../Headline'

const SearchButton = withViewSearchArrowButton(ButtonBase)
const SearchInput = withHasClear(withViewSearchArrowTextinput(TextinputBase))

export const HeaderShowcase = () => {
  return (
    <>
      <Headline> Header </Headline>
      <div className="Showcase-Item">
        <Header className="SearchHeader">
          <HeaderSearch action="//yandex.ru/search">
            <SearchInput view="search-arrow" name="text" hasClear value="Yandex" />
            <SearchButton view="search-arrow"> Найти </SearchButton>
          </HeaderSearch>
        </Header>
        <br /> <br />
        <Header className="SearchHeader">
          <HeaderSearch action="//yandex.ru/search">
            <HeaderNav>
              <HeaderNavItem href="/"> Таб </HeaderNavItem>
              <HeaderNavItem href="/"> По </HeaderNavItem>
              <HeaderNavItem href="/"> Умолчанию </HeaderNavItem>
              <HeaderNavItem href="/" active>
                Активный
              </HeaderNavItem>
            </HeaderNav>
          </HeaderSearch>
        </Header>
      </div>
    </>
  )
}
