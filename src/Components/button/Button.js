import React from 'react'

export default function Button(props) {
  return (
    <button {...props} className='text-white bg-accent disabled:opacity-50 px-3 py-1.5 m-1 rounded-md focus:ring-4 focus:ring-blue-200'>
        {props.children}
    </button>
  )
}
