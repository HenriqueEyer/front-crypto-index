interface AppProps {
  hideMessage: () => void
}

const NotificationSuccess: React.FC<AppProps> = ({ hideMessage })  => {
  setTimeout(hideMessage, 3500)
  return (
    <div className="notification absolute top-0 bg-blue-200 text-black">
      <p>Valor alterado com sucesso</p>
    </div>
  )
}

export default NotificationSuccess
