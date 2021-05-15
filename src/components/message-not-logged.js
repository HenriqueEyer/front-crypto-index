import { Link } from 'react-router-dom'

const MessageNotLogged = () => {
  return (
    <div className="flex h-screen items-center justify-center align-center bg-gray-200">
      <div className="w-auto h-auto">
        <div className="flex w-full flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <p>Favor realizar o Login para acessar os dados!</p>
          <Link className="text-center rounded-md p-2 w-6/12 bg-green-100 hover:bg-green-500"  to="/login">Tela login</Link>
        </div>
      </div>
    </div>
  )
}

export default MessageNotLogged
