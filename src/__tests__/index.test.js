beforeEach(() => {
  jest.resetModules()
})

it('logs an error if the `onClick` callback is not provided', () => {

  const elementPicker = require('../')
  const errorSpy      = jest.spyOn(global.console, 'error')

  elementPicker.init()
  expect(errorSpy).toHaveBeenCalledWith('onClick option needs to be specified.')
  errorSpy.mockReset()
  errorSpy.mockRestore()

})

it('changes the background color of the hovered element on a mousemove event',
  () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'mousemove', expect.any(Function), false
  )
  const target = {
    style : {}
  }
  // Trigger a mousemove event
  addEventListenerSpy.mock.calls[1][1]({
    target,
  })

  expect(document.body.style.cursor).toBe('pointer')
  expect(target.style.backgroundColor).toBe('rgba(0, 0, 0, 0.1)')

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('resets the background color of the hovered element on a click event',
  () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'click', expect.any(Function), false
  )
  const initialBackgroundColor = 'rgba(0, 0, 0, 0.42)'
  const target = {
    style : {
      backgroundColor : initialBackgroundColor,
    }
  }
  // Trigger a mousemove event
  addEventListenerSpy.mock.calls[1][1]({
    target,
  })
  // Trigger a click event
  addEventListenerSpy.mock.calls[0][1]({
    target,
  })

  expect(document.body.style.cursor).toBe('auto')
  expect(target.style.backgroundColor).toBe(initialBackgroundColor)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('triggers the `onClick` callback if an element gets clicked', () => {

  const elementPicker = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'click', expect.any(Function), false
  )
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'mousemove', expect.any(Function), false
  )
  const target = {
    style : {}
  }
  // Trigger a mousemove event
  addEventListenerSpy.mock.calls[1][1]({
    target,
  })
  // Trigger a click event
  addEventListenerSpy.mock.calls[0][1]({
    target,
  })

  expect(onClick).toHaveBeenCalledWith(target)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('uses custom backgroundColor when provided', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()
  const customColor         = 'rgba(255, 0, 0, 0.5)'

  elementPicker.init({ onClick, backgroundColor: customColor })

  const target = { style: {} }
  // Trigger a mousemove event
  addEventListenerSpy.mock.calls[1][1]({ target })

  expect(target.style.backgroundColor).toBe(customColor)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('resets oldTarget color when hovering over a new element', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })

  const firstTarget  = { style: { backgroundColor: 'red' } }
  const secondTarget = { style: { backgroundColor: 'blue' } }

  // Trigger first mousemove event
  addEventListenerSpy.mock.calls[1][1]({ target: firstTarget })
  expect(firstTarget.style.backgroundColor).toBe('rgba(0, 0, 0, 0.1)')

  // Trigger second mousemove event on a different element
  addEventListenerSpy.mock.calls[1][1]({ target: secondTarget })
  expect(firstTarget.style.backgroundColor).toBe('red')
  expect(secondTarget.style.backgroundColor).toBe('rgba(0, 0, 0, 0.1)')

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('handles click events without preventDefault/stopPropagation', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })

  const target = { style: {} }
  // Trigger mousemove first
  addEventListenerSpy.mock.calls[1][1]({ target })
  // Trigger click without preventDefault/stopPropagation methods
  addEventListenerSpy.mock.calls[0][1]({ target })

  expect(onClick).toHaveBeenCalledWith(target)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('handles click events with preventDefault/stopPropagation', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()
  const preventDefault      = jest.fn()
  const stopPropagation     = jest.fn()

  elementPicker.init({ onClick })

  const target = { style: {} }
  // Trigger mousemove first
  addEventListenerSpy.mock.calls[1][1]({ target })
  // Trigger click with preventDefault/stopPropagation methods
  addEventListenerSpy.mock.calls[0][1]({ target, preventDefault, stopPropagation })

  expect(preventDefault).toHaveBeenCalled()
  expect(stopPropagation).toHaveBeenCalled()
  expect(onClick).toHaveBeenCalledWith(target)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('handles click without prior mousemove (no oldTarget)', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })

  const target = { style: {} }
  // Trigger click directly without mousemove
  addEventListenerSpy.mock.calls[0][1]({ target })

  expect(onClick).toHaveBeenCalledWith(target)
  expect(document.body.style.cursor).toBe('auto')

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('uses srcElement fallback when target is not available (IE)', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })

  const srcElement = { style: {} }
  // Trigger mousemove with srcElement instead of target
  addEventListenerSpy.mock.calls[1][1]({ srcElement })

  expect(srcElement.style.backgroundColor).toBe('rgba(0, 0, 0, 0.1)')

  // Trigger click with srcElement
  addEventListenerSpy.mock.calls[0][1]({ srcElement })
  expect(onClick).toHaveBeenCalledWith(srcElement)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})

it('uses window.event fallback when event is not passed (old IE)', () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })

  const target = { style: {} }
  // Set window.event for old IE fallback
  window.event = { target }

  // Trigger mousemove with null/undefined event (old IE style)
  addEventListenerSpy.mock.calls[1][1](null)

  expect(target.style.backgroundColor).toBe('rgba(0, 0, 0, 0.1)')

  // Trigger click with null event
  addEventListenerSpy.mock.calls[0][1](null)
  expect(onClick).toHaveBeenCalledWith(target)

  delete window.event
  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})