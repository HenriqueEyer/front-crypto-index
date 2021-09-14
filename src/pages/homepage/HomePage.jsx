import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="flex font-mono h-screen items-center justify-center align-center bg-black">
        <div className="flex flex-col items-center space-y-7 min-w-full px-5 sm:px-10 md:px-3 py-14 mb-36 bg-white rounded-md">
          <div className="text-gray-800 text-2xl w-full flex justify-center border-b-2 py-2 mb-4">
            <h1>
              Bem vindos - CRYPTO INDEX
          </h1>
          </div>
          <div className="flex flex-col">
            <p className="pl-3">
              Pequena aplicação de cotação do bitcoin. Para acessar as informações necessário realizar o Login.
            </p>
          </div>
          <div className="flex items-center flex-col space-y-5">
            <h2>Páginas</h2>
            <ul className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-12 flex-wrap">
              <li className="flex flex-col justify-items-center rounded-md py-2 px-4 bg-blue-300 hover:bg-blue-500">
                <Link to='/login'>Login</Link>
              </li>
              <li className="flex flex-col justify-items-center rounded-md py-2 px-4 bg-blue-300 hover:bg-blue-500">
                <Link to='/currency'>Cotação</Link>
              </li>
              <li className="flex flex-col justify-items-center rounded-md py-2 px-4 bg-blue-300 hover:bg-blue-500">
                <Link to='/currency/update'>Atualizar Dolár</Link>
              </li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default HomePage
