import {ClipLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center flex-col w-full p-5 min-h-screen bg-white">
        <ClipLoader color='#fbbf24' size={70}/>
    </div>
  )
}
export default Spinner