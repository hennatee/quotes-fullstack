
import React, { useState } from 'react'
import {  createQuote } from '../reducers/quoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Togglable } from './togglable'


export const QuoteForm = () => {
  const quoteFormRef = React.createRef()

  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  let dispatch = useDispatch()

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthor('')
    setDescription('')
    dispatch(createQuote({ 
      author: author, 
      description: description, 
      likes: 0 
    }))
    dispatch(setNotification(`New quote ${description} added`, 5))
  }

  return (
    <Togglable buttonLabel='Add new quote' ref={quoteFormRef}>
    <div>
      <h2>New quote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Author: 
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Quote: 
          <input
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Add quote</button>
      </form>
    </div>
    </Togglable>
  )
}