import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex items-center justify-around py-4 bg-violet-600'>
            <div className="text-white cursor-pointer text-2xl font-bold">iTask</div>
            <ul className='flex items-center gap-7'>
                <li className='text-base text-white cursor-pointer'>Your Tasks</li>
                <li className='text-base text-white cursor-pointer'><a target='_blank' href="https://www.github.com/hazikkhatri">Github</a></li>
            </ul>
        </nav>
    )
}

export default Navbar