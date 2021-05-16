import React from 'react';
import { waitFor, cleanup, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react';
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

describe('Update Page', () => {
  afterEach(() => {
    fetchMock.restore()
    jest.clearAllMocks()
  })

  beforeEach(() => { cleanup() })
  afterEach(() => { cleanup() })

  const renderUpdateCurrency = () => {
    const container = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={['/currency/update']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    return container
  }

  test('should render page update have token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('token_valid')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Novo Valor')).toBeInTheDocument()
  })

  test('should show message of token invalid if not have token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue(null)
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderUpdateCurrency()
    await expect(getByText('Tela login')).toBeInTheDocument()
  })

  test('should show message of token invalid if not have valid token', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('invalido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Token Invalido' },
      status: 401
    })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Página Login')).toBeInTheDocument()
  })

  test('should show message error generic', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Token Invalido' },
      status: 404
    })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Erro inesperado, favor tentar mais tarde ou realizar o login novamente!')).toBeInTheDocument()
  })

  test('should show message of service invalid if happen error', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      throws: { message: 'network error' }
    })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    await expect(getByText('Serviço indisponível, tentar novamente ou outro horário!')).toBeInTheDocument()
  })

  test('should check link to page currency', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    fireEvent.click(getByText('Voltar'))
    expect(getByText('Atualizar valor monetário')).toBeInTheDocument()
  })

  test('should check if button start with disabled false and success request redirect to currency page', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    fetchMock.post('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Valor alterado com sucesso!' },
      status: 200
    }, { overwriteRoutes: false })
    const { getByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    const btnAtualizar = getByText('Atualizar')
    fireEvent.click(btnAtualizar)
    await expect(getByText('Carregando')).toBeInTheDocument()
    await waitForElementToBeRemoved(getByText('Novo Valor'))
    expect(getByText('Atualizar valor monetário')).toBeInTheDocument()
  })

  test('should check if show message if fail in fetch api', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    fetchMock.post('http://localhost:3001/api/crypto/btc', {
      throws: { error: 'Serviço indisponivel' },
    }, { overwriteRoutes: false })

    const { getByText, queryByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    const btnAtualizar = getByText('Atualizar')
    fireEvent.click(btnAtualizar)
    await waitFor(() => expect(getByText('Serviço indisponível favor tentar mais tarde!')).toBeInTheDocument())
    fireEvent.click(getByText('X'))
    expect(queryByText('Serviço indisponível favor tentar mais tarde!')).not.toBeInTheDocument()
  })

  test('should show message of error', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    fetchMock.post('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Invalido token' },
    }, { overwriteRoutes: false })

    const { getByText, queryByText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    const btnAtualizar = getByText('Atualizar')
    fireEvent.click(btnAtualizar)
    await waitFor(() => expect(getByText('Invalido token')).toBeInTheDocument())
    fireEvent.click(getByText('X'))
    expect(queryByText('Invalido token')).not.toBeInTheDocument()
  })

  test('should check if ipt value just accept integer and bigger than 0', async () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('Valido')
    fetchMock.get('http://localhost:3001/api/crypto/btc', {
      body: bodyMock,
      status: 200
    })
    fetchMock.post('http://localhost:3001/api/crypto/btc', {
      body: { message: 'Invalido token' },
    }, { overwriteRoutes: false })

    const { getByText, getByLabelText } = renderUpdateCurrency()
    await waitForElementToBeRemoved(getByText('Carregando!'))
    const btnAtualizar = getByText('Atualizar')
    const iptValue = getByLabelText('Novo Valor')
    fireEvent.change(iptValue, { target: { value: 'a' } })
    expect(iptValue.value).toBe('')
    fireEvent.change(iptValue, { target: { value: 0 } })
    expect(iptValue.value).toBe('')
    fireEvent.change(iptValue, { target: { value: '5' } })
    expect(iptValue.value).toBe('5')
    expect(btnAtualizar.disabled).toBe(false)
    fireEvent.change(iptValue, { target: { value: 0.5 } })
    expect(btnAtualizar.disabled).toBe(true)
    fireEvent.change(iptValue, { target: { value: '5' } })
    expect(btnAtualizar.disabled).toBe(false)
  })
})
