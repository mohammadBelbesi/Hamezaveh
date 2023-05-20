import React from 'react'

const BeforeMyProducts = () => {
  return (
    <div>
      <div className='beforeProducts flex flex-col items-center gap-4'>
        <h1 className='hebrewTexts text-center bg-black text-white w-200 text-xs'>
          קצת מהמוצרים שמוכרים
        </h1>
        <span className='w-36 h-[4px] bg-black'></span>
        <p className='max-w-[700] text-gray-600 text-center text-xl'> "האושר מתרבה כאשר אנו חולקים אותו עם אחרים."</p>
      </div>
    </div>
  )
}

export default BeforeMyProducts