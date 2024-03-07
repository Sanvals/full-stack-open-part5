import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog =
    {
      title: 'Component testing',
      url: '',
      likes: 21,
      author: {
        username: 'Josefa',
        name: 'Josefina',
        id: '65e1c334831732d222a6151c'
      },
      likedBy: ['Josefa'],
      id: '65e4aecc9cd77c43b4fd1053'
    }

  render(
    <Blog
      blog={blog}
      user='Josefa'
      deleteBlogApp={vi.fn()}
    />
  )

  // screen.debug()

  const element = screen.getByText(/Component testing/)
  expect(element).toBeDefined()

  const author = screen.getAllByText(/Josefa/)
  expect(author).toBeDefined()
})