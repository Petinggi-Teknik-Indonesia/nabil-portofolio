import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-20 h-20 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin' />

        <p className='mt-5 text-slate-600 font-poppins text-sm font-medium whitespace-nowrap'>
          Loading...
        </p>

        <p className='mt-1 text-slate-400 font-poppins text-xs'>
          {Math.round(progress)}%
        </p>

        <div className='mt-3 w-40 h-1.5 bg-slate-200 rounded-full overflow-hidden'>
          <div
            className='h-full bg-blue-500 rounded-full transition-all duration-200'
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </Html>
  )
}

export default Loader