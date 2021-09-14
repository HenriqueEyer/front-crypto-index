import { Link } from "react-router-dom"
import { StatusError } from "../Interfaces/interface"

interface ReturnFormatMessage{
  message: string,
  redirectLogin: boolean
}

interface AppProps {
  error: StatusError
}

const formatMessage = ({ status, message }: StatusError ):ReturnFormatMessage => {
  if (status === 401) {
    return {
      message: 'Token de acesso inválido, favor realizar login!',
      redirectLogin: true
    }
  }
  if (status === 500) {
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


const MessageError: React.FC<AppProps>  = ({ error }) => {
  const { message, redirectLogin } = formatMessage(error)
  return (
    <div className="background-page">
      <div className="w-auto h-auto">
        <div className="center-secondary-div px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
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
