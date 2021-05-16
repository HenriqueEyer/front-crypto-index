import React from 'react';
import { cleanup, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
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
  data: {
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
        rate: '1,0000.00',
        description: 'Bitcoin',
        rate_float: 1
      },
      BRL: {
        code: 'BRL',
        rate: '1.0000',
        description: 'Bitcoin',
        rate_float: 10000
      },
      EUR: {
        code: 'EUR',
        rate: '1.0000',
        description: 'Bitcoin',
        rate_float: 10000
      },
      CAD: {
        code: 'CAD',
        rate: '2.0000',
        description: 'Bitcoin',
        rate_float: 20000
      }
    }
  }
}

describe('Currency Page', () => {
  afterEach(() => {
    fetchMock.restore()
    jest.clearAllMocks()
  })

  beforeEach(() => { cleanup() })
  afterEach(() => { cleanup() })

  const renderCurrency = () => {
    const container = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={['/currency']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    return container
  }

  test('should render page error with not have token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('token_valid')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Atualizar valor monetário')).toBeInTheDocument()
  })

  test('should show message of token invalid if not have token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue(null)
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderCurrency()
    await expect(getByText('Tela login')).toBeInTheDocument()
  })

  test('should show message of token invalid if not have valid token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('invalido')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Token Invalido' },
      status: 401
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Página Login')).toBeInTheDocument()
  })

  test('should show message of service invalid if happen error', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('valido')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      throws: { message: 'network error' }
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Serviço indisponível, tentar novamente ou outro horário!')).toBeInTheDocument()
  })

  test('should check if show the value of api brought', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    expect(getByText(bodyMock.data.bpi.CAD.code)).toBeInTheDocument()
    expect(getByText('R$ 20.000,00')).toBeInTheDocument()
  })

  test('should check if input of BTC change values', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    expect(getByText(bodyMock.data.bpi.CAD.code)).toBeInTheDocument()
    expect(getByText('R$ 20.000,00')).toBeInTheDocument()
    const inputBTC = getByText('BTC').nextSibling
    fireEvent.change(inputBTC, { target: { value: 10 } })
    expect(getByText('R$ 200.000,00')).toBeInTheDocument()
  })

  test('should check if input not accept other value different of number and bigger or equal to zero', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.mock('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    expect(getByText(bodyMock.data.bpi.CAD.code)).toBeInTheDocument()
    expect(getByText('R$ 20.000,00')).toBeInTheDocument()
    const inputBTC = getByText('BTC').nextSibling
    fireEvent.change(inputBTC, { target: { value: 'a' } })
    expect(inputBTC.value).toBe('0');
    fireEvent.change(inputBTC, { target: { value: '2' } })
    expect(inputBTC.value).toBe('2');
    fireEvent.change(inputBTC, { target: { value: '-2' } })
    expect(inputBTC.value).toBe('0');
  })
})
