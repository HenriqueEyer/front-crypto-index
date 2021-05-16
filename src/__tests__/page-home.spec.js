import React from 'react';
import { cleanup, render } from '@testing-library/react';
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


describe('Currency Page', () => {
  beforeEach(() => { cleanup() })
  afterEach(() => { cleanup() })

  const renderHome = () => {
    const container = renderWithRouter(
      <Provider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
    return container
  }
  test('should "/" renders Homepage', () => {
    const { getByText } = renderHome()
    expect(getByText('Bem vindos - CRYPTO INDEX')).toBeInTheDocument()
  });
})
