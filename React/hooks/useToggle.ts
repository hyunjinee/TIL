import React, {useState, useCallback} from 'react'

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(value => !value), [])
  return [value, toggle]
}