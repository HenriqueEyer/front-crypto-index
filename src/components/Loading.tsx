const Loading: React.FC = () =>  {
  return (
    <div className="flex h-screen items-center justify-center align-center bg-black">
      <div className="w-auto h-auto">
        <div className="box-information">
          <p>Carregando...</p>
        </div>
      </div>
    </div>
  )
}

export default Loading
