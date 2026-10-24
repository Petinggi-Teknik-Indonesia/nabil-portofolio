import React from 'react'

const Alert = ({ type, text }) => {
  return (
    <div className='fixed top-20 inset-x-0 z-50 flex justify-center px-4'>
        <div className={`${type === 'danger' ? 'bg-red-800' : 'bg-blue-800'}
         w-full max-w-2xl rounded-xl px-4 py-3 text-indigo-100 leading-normal flex items-start`} role={type === 'danger' ? 'alert' : 'status'} aria-live={type === 'danger' ? 'assertive' : 'polite'}>
            <p className={`${type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}
            flex rounded-full uppercase px-2 py-1 font-semibold mr-3 text-xs`}>
                {type === 'danger' ? 'Failed' : 'Success'}</p>
            <p className='mr-2 min-w-0 break-words text-left'>{text}</p>
        </div>
    </div>
  )
}

export default Alert
