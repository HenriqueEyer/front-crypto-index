interface AppProps {
  message: string
  resetMessage: () => void
}

const NotificationError: React.FC<AppProps> = ({ resetMessage, message })  =>  {
  return (
    <div className="notification">
      <p>{message}</p>
      <button className="p-3 text-xl" onClick={() =>resetMessage()}>X</button>
    </div>
  )
}

export default NotificationError
