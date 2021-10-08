
import React, { useState } from 'react'
import {  createReason } from '../reducers/reducer-reason'
import { setNotification } from '../reducers/reducer-notification'
import { useDispatch } from 'react-redux'
import { Togglable } from './togglable'


export const ReasonForm = () => {
  const reasonFormRef = React.createRef()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  let dispatch = useDispatch()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitle('')
    setDescription('')
    dispatch(createReason({ 
      title: title, 
      description: description, 
      stars: 0 
    }))
    dispatch(setNotification(`New reason ${title} added`, 5))
  }

  return (
    <Togglable buttonLabel='Add new reason' ref={reasonFormRef}>
    <div>
      <h2>New reason</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Description: <input
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Add reason</button>
      </form>
    </div>
    </Togglable>
  )
}