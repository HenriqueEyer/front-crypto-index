const Loading = () =>  {
  return (
    <div className="flex h-screen items-center justify-center align-center bg-gray-200">
      <div className="w-auto h-auto">
        <div className="flex w-full flex-col items-center space-y-7 px-5 sm:px-10 md:px-20 py-14 mb-36 bg-white rounded-md">
          <p>Carregando!</p>
        </div>
      </div>
    </div>
  )
}

export default Loading
