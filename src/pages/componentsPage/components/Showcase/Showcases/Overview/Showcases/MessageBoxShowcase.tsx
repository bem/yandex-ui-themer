import React from 'react'
import { Button } from '@yandex-lego/components/Button/desktop/bundle'

import { Headline } from '../Headline'

import { getWrappedComponent } from '../../../../../../../utils/getWrappedComponent'

// const MessageBox = getWrappedComponent('MessageBox');

export const MessageBoxShowcase = () => {
  return (
    <>
      <Headline>MessageBox</Headline>
      {/* <div className="Showcase-Item">
        <div style={{ marginBottom: '16px' }}>
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
        <div style={{ marginBottom: '16px' }}>
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
        <div style={{ marginBottom: '16px' }}>
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
      </div> */}
    </>
  )
}
