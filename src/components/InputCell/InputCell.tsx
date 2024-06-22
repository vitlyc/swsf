import React from 'react'

type Props = {}

function InputCell({type,value,onChange,disabled}: Props) {
  return (
    <td>
        <input
          type={type}
          value=value}
          onChange={onChange}
          disabled={disabled}
        />
      </td>
  )
}

export default InputCell