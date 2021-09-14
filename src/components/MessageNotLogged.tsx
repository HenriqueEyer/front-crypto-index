import { Link } from 'react-router-dom'

const MessageNotLogged: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center align-center bg-black">
        <div className="flex w-auto flex-col box-information">
          <p>Favor realizar o Login para acessar os dados!</p>
          <Link className="link-button-blue"  to="/login">Tela login</Link>
        </div>
    </div>
  )
}

export default MessageNotLogged
