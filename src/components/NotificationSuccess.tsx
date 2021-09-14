interface AppProps {
  hideMessage: () => void
}

const NotificationSuccess: React.FC<AppProps> = ({ hideMessage }) => {
  setTimeout(hideMessage, 3000)
  return (
    <div className="notification bg-blue-300 text-black">
      <p>Valor alterado com sucesso</p>
    </div>
  )
}

export default NotificationSuccess
