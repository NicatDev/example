import React from 'react'
import lang from '@/config/Languages/index'

const LanguageContent = () => {
  return lang.languages.map((language) => (
    <div key={language.code} className='flex items-center justify-between'>
      <p
        onClick={() => lang.changeLanguage(language.code)}
        className='py-2 px-3 hover:bg-[#F5F5F5] cursor-pointer w-full '
      >
        {language.name}
      </p>
    </div>
  ))
}

export default LanguageContent
