import { Link } from "react-router-dom"
import { ReturnStatus } from "../Interfaces/interface"

interface ReturnFormatMessage{
  message: string,
  redirectLogin: boolean
}

interface AppProps {
  status: ReturnStatus
}

const formatMessage = ({ code, message }: ReturnStatus ):ReturnFormatMessage => {
  if (code === 401) {
    return {
      message: 'Token de acesso inválido, favor realizar login!',
      redirectLogin: true
    }
  }
  if (code === 500) {
    return {
      message,
      redirectLogin: false
    }
  }
  return {
    message: 'Erro inesperado, favor tentar mais tarde ou realizar o login novamente!',
    redirectLogin: true
  }
}


const MessageError: React.FC<AppProps>  = ({ status })  => {
  const { message, redirectLogin } = formatMessage(status)
  return (
    <div className="background bg-indigo-500 items-center justify-center">
      <div className="w-auto h-auto">
        <div className="box-information">
          <p>{message}</p>
          {redirectLogin
            ? <Link className="link-button-blue px-8" to="/login"> Página Login </Link>
            : null}
        </div>
      </div>
    </div>
  )
}

export default MessageError
