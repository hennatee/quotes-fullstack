
import React  from 'react'
import { useSelector } from 'react-redux'


export const Notification = () => {
  const notification = useSelector(state => state.notification)
  const visibility = notification === '' ? 'hidden' : 'visible'

  const style = {
    border: 'solid',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    visibility: visibility
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}