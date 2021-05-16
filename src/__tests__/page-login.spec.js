import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider, CurrencyContext } from '../context'
import Login from '../pages/login/login'
import { MemoryRouter } from "react-router-dom"
import App from '../App';

describe('Login Page', () => {
  const renderLogin = () => {
    const screen = render(
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

    fireEvent.change(iptEmail, {target: {value: 'valid@email.com'}})
    fireEvent.change(iptPassword,{ target: {value: '123456'}})
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(false)
  });

  test('should button disabled true if email invalid', () => {
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, {target: {value: 'invalid'}})
    fireEvent.change(iptPassword,{ target: {value: '123456'}})
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(true)
  });

  test('should button disabled true if password invalid', () => {
    const { getByLabelText, getByText } = renderLogin()
    const iptEmail = getByLabelText('Email')
    const iptPassword = getByLabelText('Senha')
    const btn = getByText('Entrar')

    fireEvent.change(iptEmail, {target: {value: 'valid@email.com'}})
    fireEvent.change(iptPassword,{ target: {value: 'invalid'}})
    expect(btn).toBeInTheDocument()
    expect(btn.disabled).toBe(true)
  });
})
