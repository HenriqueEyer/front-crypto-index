const NotificationError = (props) =>  {
  const { resetMessage, message } = props
  return (
    <div className="fixed top-0 flex
    items-center space-x-1 bg-red-500 py-1 
    px-4 text-gray-100">
      <p>{message}</p>
      <button className="p-3 text-xl" onClick={() =>resetMessage()}>X</button>
    </div>
  )
}

export default NotificationError
