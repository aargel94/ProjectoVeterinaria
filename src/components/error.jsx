const error = ({children}) => {
  return (
    <div
        className='bg-red-800 text-white text-center p-3 uppercase font-bold mb-4 rounded-md'
    >
        {children}
    </div>
  )
}

export default error
