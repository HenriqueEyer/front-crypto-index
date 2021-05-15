const NotificationError = (props) =>  {
  const { resetMessage, message } = props
  return (
    <div className="flex items-center rounded-md space-x-1 bg-red-100 py-1 px-4">
      <p>{message}</p>
      <button className="p-3 text-xl" onClick={() =>resetMessage()}>X</button>
    </div>
  );
};

export default NotificationError;
