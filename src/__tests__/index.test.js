it('logs an error if the `onClick` callback is not provided', () => {

  const elementPicker = require('../')
  const errorSpy      = jest.spyOn(global.console, 'error')

  elementPicker.init()
  expect(errorSpy).toBeCalledWith('onClick option needs to be specified.')
  errorSpy.mockReset()
  errorSpy.mockRestore()

})

it('changes the background color of the hovered element on a mousemove event',
  () => {

  const elementPicker       = require('../')
  const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener')
  const onClick             = jest.fn()

  elementPicker.init({ onClick })
  expect(addEventListenerSpy).toBeCalledWith(
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
  expect(addEventListenerSpy).toBeCalledWith(
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
  expect(addEventListenerSpy).toBeCalledWith(
    'click', expect.any(Function), false
  )
  expect(addEventListenerSpy).toBeCalledWith(
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

  expect(onClick).toBeCalledWith(target)

  addEventListenerSpy.mockReset()
  addEventListenerSpy.mockRestore()

})