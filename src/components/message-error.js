import { Link } from "react-router-dom"

const formatMessage = ({ status, message }) => {
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

const MessageError = ({ error }) => {
  const { message, redirectLogin } = formatMessage(error)
  return (
    <div className="flex h-screen items-center justify-center align-center bg-gray-200">
      <div className="w-auto h-auto">
        <div className="flex w-full flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <p>{message}</p>
        {redirectLogin
          ? <Link className="text-center rounded-md p-2 w-6/12 bg-green-100 hover:bg-green-500" to="/login"> Página Login </Link>
          : null}
        </div>
      </div>
    </div>
  )
}

export default MessageError
