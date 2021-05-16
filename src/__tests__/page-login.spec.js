import React from 'react';
import { cleanup, fireEvent, render, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { createMemoryHistory } from 'history'
import { Provider } from '../context'
import { MemoryRouter, Router } from "react-router-dom"
import App from '../App';
import 'jest-localstorage-mock';


jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div> {children} </div>),
  }
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}


const bodyMock = {
  time: {
    updated: 'Mar 22, 2020 23:54:00 UTC',
    updatedISO: '2020-03-22T23:54:00+00:00',
    updateduk: 'Mar 22, 2020 at 23:54 GMT'
  },
  disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  bpi: {
    USD: {
      code: 'USD',
      rate: '6,506.6717',
      description: 'United States Dollar',
      rate_float: 6506.6717
    },
    BTC: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    },
    BRL: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    },
    EUR: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    },
    CAD: {
      code: 'BTC',
      rate: '1.0000',
      description: 'Bitcoin',
      rate_float: 1
    }
  }
}

describe('Login Page', () => {
  afterEach(() => {
    fetchMock.restore()
    jest.clearAllMocks()
  })

  beforeEach(() => { cleanup() })
  afterEach(() => { cleanup() })

  const renderLogin = () => {
    const container = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    const { getByText } = container
    const linkLogin = getByText('Login')
    fireEvent.click(linkLogin)
    return container
  }

  test('should render page Login', () => {
    const { getByText } = renderLogin()
    expect(getByText('Login')).toBeInTheDocument()
    expect(getByText('Login').tagName).toBe('H1')
  });

  test('should button start disabled', () => {
    const { getByText } = renderLogin()
    expect(getByText('Entrar')).toBeInTheDocument()
    expect(getByText('Entrar').disabled).toBe(true)
  });


  test('should button disabled false if email and password valid', () => {
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(false)
  });

  test('should button disabled true if email invalid', () => {
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, { target: { value: 'invalid' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(true)
  });

  test('should button disabled true if password invalid', () => {
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: 'invalid' } })
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(true)
  });

  test('should button if click make a request', async () => {
    fetchMock.mock('http://localhost:3001/api/login', {
      body: { token: 'any_token' },
      status: 200
    })
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const setItemSpy = jest.spyOn(localStorage, 'setItem')

    const { getByLabelText, getByText, queryByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(false)
    fireEvent.click(btn)
    await expect(getByText('Carregando')).toBeInTheDocument()
    await waitForElementToBeRemoved(getByText('Login'))
    expect(queryByText('Login')).not.toBeInTheDocument()
    expect(setItemSpy).toHaveBeenCalledWith('token', 'any_token')
  });

  test('should return message of error if request invalid', async () => {
    fetchMock.mock('http://localhost:3001/api/login', {
      body: { message: 'Any Message' },
      status: 400
    })

    const setItemSpy = jest.spyOn(localStorage, 'setItem')
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')
    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    fireEvent.click(btn)
    expect(setItemSpy).not.toBeCalled()
    await waitFor(() => expect(getByText('Any Message')).toBeInTheDocument())
  });

  test('should clear message if clicked on button', async () => {
    fetchMock.mock('http://localhost:3001/api/login', {
      body: { message: 'Any Message' },
      status: 400
    })
    const setItemSpy = jest.spyOn(localStorage, 'setItem')
    const { getByLabelText, getByText, queryByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')
    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    fireEvent.click(btn)
    expect(setItemSpy).not.toBeCalled()
    await waitFor(() => expect(getByText('Any Message')).toBeInTheDocument())
    fireEvent.click(getByText('X'))
    expect(queryByText('Any Message')).not.toBeInTheDocument()
  });

  test('should return message of error if throws', async () => {
    fetchMock.mock('http://localhost:3001/api/login',
      { throws: { message: 'network error' } })
    const setItemSpy = jest.spyOn(localStorage, 'setItem')
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')
    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    fireEvent.click(btn)
    expect(setItemSpy).not.toBeCalled()
    await waitFor(() => expect(getByText('Serviço indisponível favor tentar mais tarde!')).toBeInTheDocument())
  });

  test('should clear the message with error on click', async () => {
    fetchMock.mock('http://localhost:3001/api/login',
      { throws: { message: 'network error' } })
    const setItemSpy = jest.spyOn(localStorage, 'setItem')
    const { getByLabelText, getByText, queryByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')
    fireEvent.change(iptEmail, { target: { value: 'valid@email.com' } })
    fireEvent.change(iptPassword, { target: { value: '123456' } })
    fireEvent.click(btn)
    expect(setItemSpy).not.toBeCalled()
    await waitFor(() => expect(getByText('Serviço indisponível favor tentar mais tarde!')).toBeInTheDocument())
    fireEvent.click(getByText('X'))
    expect(queryByText('Any Message')).not.toBeInTheDocument()
  });
})

