import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'Verneri Turunen',
  id: '123123123123',
  likes: 15,
  title: 'The Wonders of CSS',
  url: 'css-land.com',
  user: {
    id: '456456456',
    name: 'Verneri Turunen',
    username: 'Veku'
  }
}

test('renders title and author, but not url and likes by default', () => {
  render(<Blog blog={blog} />)

  //check that title and author are rendered on screen
  const titleElem = screen.getByText('The Wonders of CSS')
  expect(titleElem).toBeDefined()

  const authorElem = screen.getByText('Verneri Turunen')
  expect(authorElem).toBeDefined()

  //check that url and likes are not rendered by default
  const urlElem = screen.queryByText('css-land.com')
  expect(urlElem).toBe(null)

  const likesElem = screen.queryByText('likes', { exact:false })
  expect(likesElem).toBe(null)
})

test('renders url and likes after user clicks the view-button', async() => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //are url and likes rendered?
  //getByText throws an error if element not found -> no need to use expect
  screen.getByText('likes 15')
  screen.getByText('css-land.com')
})