import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('shows number of likes', () => {
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

  const user = userEvent.setup()
  const button = screen.getByText('❤️')
  user.click(button)

  const likes = screen.getByText(/21/)
  // screen.debug()
  expect(likes).toBeDefined()
})