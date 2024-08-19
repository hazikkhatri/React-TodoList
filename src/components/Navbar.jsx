import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex py-3 bg-violet-600 justify-around items-center'>
            <div className="text-white font-bold text-2xl">iTask</div>
            <ul className='flex gap-4 items-center'>
                <li className='text-white text-base'>Home</li>
                <li className='text-white text-base'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
