import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'

const SendBox = ({handleSubmit}) => {
  const [input, setinput] = useState('');
  return (
    <div className='bg-white p-4 h-[5rem] shadow-sm'>
        <div>
          <div className="flex gap-5 items-center mb-[4rem]">
            <input type="text" className="h-10 border  p-3 text-sm w-[52rem]" placeholder="Write a message..." 
            value={input}
            onChange={(e) => setinput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(input);
                setinput('');
              }
            }}
            />
            <PaperAirplaneIcon
            onClick={() => {
              handleSubmit(input)
              setinput('')
            }}
            className="w-8 h-8 text-teal-600 cursor-pointer" />
          </div>
        </div>
    </div>
  )
}

export default SendBox