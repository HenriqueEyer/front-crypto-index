import React from 'react'
import { Link } from 'react-router-dom'
import Navegacao from '../../components/Navegacao'
import img_crypto from '../../assets/crypto.svg'

const HomePage: React.FC = () => {
  return (
    <div className="background">
      <div className="top">
        <Navegacao />
        <img className="mt-6 mb-2" alt="Imagem de fundo com grande simbolo do bitcoin" src={img_crypto} />
        <div className="w-5/6 bg-white rounded-md text-center p-4">
          <h1 className="text-3xl">Boas Vindas ao <span className="text-indigo-500">BitBitCoin!</span></h1>
          <p className="text-sm my-2">
            Nessa aplicação você consiguirá ver a cotação do bitcoin!
          </p>
          <p className="text-sm mb-4">
           Para acessar as informações necessário realizar o Login.
          </p>
          <Link className="text-xl border-2 border-indigo-500 hover:bg-indigo-500 py-2 px-6 rounded-md" to='/login'>Entrar</Link>
        </div>
        <span className="mt-3 text-gray-600">Criada por Henrique Eyer.</span>
      </div>
    </div>
  )
}

export default HomePage
