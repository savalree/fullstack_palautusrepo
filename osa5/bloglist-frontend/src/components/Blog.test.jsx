import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title', () => {
  const blog = {
    title: 'TestiRenderöinti',
    author: 'SuperTest',
    url: 'www.testi.fi'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('TestiRenderöinti by SuperTest')
  expect(element).toBeDefined()
})

test('clicking view button shows url, likes and user', async () => {
  const blog = {
    title: 'TestiRenderöinti',
    author: 'SuperTest',
    url: 'www.testi.fi',
    likes: 0,
    user: {
      username: 'testi'
    }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('www.testi.fi 0 testi')

  expect(element).toBeDefined()
})

test('clicking the button twice calls event handler twice', async () => {
  const blog = {
    title: 'TestiRenderöinti',
    author: 'SuperTest',
    url: 'www.testi.fi',
    likes: 22,
    user: {
      username: 'testi'
    }
  }

  vi.mock('../services/blogs')

  const mockHandler = vi.fn()

  render(<Blog blog={blog} onUpdateBlog={mockHandler}/>)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})