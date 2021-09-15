import { Link } from 'react-router-dom'

const MessageNotLogged: React.FC = () => {
  return (
    <div className="background bg-indigo-500 items-center justify-center">
      <div className="w-auto h-auto">
        <div className="box-information">
          <p>Favor realizar o Login para acessar os dados!</p>
          <Link className="link-button-blue"  to="/login">Tela login</Link>
        </div>
    </div>
  </div>
  )
}

export default MessageNotLogged
