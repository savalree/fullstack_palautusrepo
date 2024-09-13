/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

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