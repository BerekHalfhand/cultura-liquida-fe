import React, { useState, Fragment, useContext, useId } from 'react'
import melenaCapsulsSrc from '../../assets/icons/icon_caps_melena_cart.png'
import melenaExtractSrc from'../../assets/icons/icon_melena_cart.png'
import colaSrc from '../../assets/icons/icon_cola_cart.png'
import reishiSrc from '../../assets/icons/icon_reishi_cart.png'
import CartContext from '../../contexts/cartContext/cartContext'

import Counter from '../Counter/Counter'
import {
  MelenaMain,
  ContentWrapper,
  ImageWrapperDesktop,
  ImageWrapperMobile,
  MelenaImage,
  TitleFrame,
  TitleH1,
  Description,
  FrameForTwo,
  Release,
  CheckBoxGroup,
  Item,
  Icon,
  TextDesc,
  RadioButton,
  LabelContent
} from './styled'

const Formation = ({ formationDataTitle, formationData }) => {
  // const { title } = formationDataTitle?.[0]
  // const firstWord = title.split(' ')?.[0]
  const { itemsCount, cartItems } = useContext(CartContext)
  // console.log('cartItems', cartItems)
  cartItems.map(i => console.log('ID', i.id))

  const idCart = useId()
  const [ checkedState, setCheckedState ] = useState('1')

  const [ temporalChoise, setTemporalChoise ] = useState([{
    description: "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
    icon: "/cultura-liquida-fe/static/media/icon_caps.73274297e64c0cb4e0cc92cbe8e40966.svg",
    id: idCart,
    src: "/cultura-liquida-fe/static/media/Frame_878.54c18a7c984b0f021ffa.png",
    text: "Cápsulas",
    title: "MELENA DE LEON",
    iconSrc: "/cultura-liquida-fe/static/media/icon_caps_melena_cart.9978427fa3267478ce42.png"
  }])
  const filterdContent = formationData.filter(({ id }) => id === checkedState)

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
      
      const { text } = formationData.find(item => item.id === id)
      if (text) {
        const isReishi =  formationDataTitle[0].title === 'REISHI, EXTRACTO' && reishiSrc
        const isCola =  formationDataTitle[0].title === 'COLA DE PAVO, EXTRACTO' && colaSrc

        const condMelena = text === 'Cápsulas' ?  melenaCapsulsSrc : melenaExtractSrc
        const isMelena =  formationDataTitle[0].title === 'MELENA DE LEON' && condMelena

        const condition = isReishi || isCola || isMelena 

        setTemporalChoise(() => ([
          {...formationDataTitle[0], ...filterdContent[0], text, 
            iconSrc: condition,
            idCart
            // id problem
          }
        ]))
      }
  }

// sometimes when i put func (for example: console.log() ) u need to know the sintaxis differents
// onClick={console.log('prev')} <-- this gonna be called automaticly on render time
// onClick={() => console.log('prev')} <-- this how it will be called ONLY FATER CLICK on it

  return (
  <MelenaMain>
    <ContentWrapper>
      <TitleFrame>
        {formationDataTitle.map(({ title, description}) => (
          <Fragment key={title}>
            <TitleH1>{title}</TitleH1>
            <Description>{description}</Description>  
          </Fragment>
        ))}
      </TitleFrame>
      {filterdContent.map(({ src }) => (
        <ImageWrapperMobile>
          <MelenaImage src={src}/>
        </ImageWrapperMobile>
      ))}
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
        {formationData.map(({text, icon, id}) => (
          <Item key={id} onClick={() => rechecking(id)}> 
              <RadioButton 
                type="radio" 
                id={id}
                name="group1" 
                checked={id === checkedState}
                onChange={() => rechecking(id)}
              />
            <LabelContent for="text">
              <Icon src={icon} alt={text}/>
              <TextDesc>{text}</TextDesc>
            </LabelContent>
          </Item>
          ))}
        </CheckBoxGroup>
      </FrameForTwo>
      <Counter temporalChoise={temporalChoise} />
    </ContentWrapper>
      {filterdContent.map(({ src }) => (
        <ImageWrapperDesktop>
          <MelenaImage src={src}/>
        </ImageWrapperDesktop>
      ))}
  </MelenaMain>
  )
}

export default Formation