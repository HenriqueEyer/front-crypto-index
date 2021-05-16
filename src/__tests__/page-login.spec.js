import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider } from '../context'
import { MemoryRouter } from "react-router-dom"
import App from '../App';
import 'jest-localstorage-mock';


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
  })

  const renderLogin = () => {
    render(
      <Provider>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    const { getByText } = screen
    const linkLogin = getByText('Login')
    fireEvent.click(linkLogin)
    return screen
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
    const getItemSpy = jest.spyOn(localStorage, 'setItem')

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
    expect(getItemSpy).toHaveBeenCalledWith('token', 'any_token')
  });
})

