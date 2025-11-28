import React from 'react'

const Input = ({
  id,
  label,
  errorMessage,
  type,
  value,
  onChange,
  placeholder,
  inputClassName,
  labelClassName,
  errorMessageClassName
}) => {
  return (
    <div lassName="flex flex-col gap-0.5 w-full">
      {label?.length && <label className={labelClassName} htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value} 
        className={`px-2 py-1 rounded-md w-full text-black ${inputClassName}`}
        placeholder={placeholder}
      />
      {errorMessage && <p className={`text-red-600 text-md ${errorMessageClassName}`}>{errorMessage}</p>}
    
    </div>
  )
}

export default Input
