import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="font-mono background-page">
      <div className="center-secondary-div space-home-page bg-white">
        <div className="title-home-page">
          <h1>
            Bem vindos - CRYPTO INDEX
          </h1>
        </div>
        <div className="column">
          <p className="pl-3">
            Pequena aplicação de cotação do bitcoin. Para acessar as informações necessário realizar o Login.
          </p>
        </div>
        <div className="column items-center space-y-5">
          <h2>Páginas</h2>
          <ul className="column list-buttons-home">
            <li className="link-button-blue">
              <Link to='/login'>Login</Link>
            </li>
            <li className="link-button-blue">
              <Link to='/currency'>Cotação</Link>
            </li>
            <li className="link-button-blue">
              <Link to='/currency/update'>Atualizar Dolár</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
