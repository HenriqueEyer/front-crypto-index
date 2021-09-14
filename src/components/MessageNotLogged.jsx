import { Link } from 'react-router-dom'

const MessageNotLogged = () => {
  return (
    <div className="flex h-screen items-center justify-center align-center bg-black">
        <div className="flex w-auto flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <p>Favor realizar o Login para acessar os dados!</p>
          <Link className="flex flex-col justify-items-center rounded-md py-2 px-4 bg-blue-300 hover:bg-blue-500"  to="/login">Tela login</Link>
        </div>
    </div>
  )
}

export default MessageNotLogged
