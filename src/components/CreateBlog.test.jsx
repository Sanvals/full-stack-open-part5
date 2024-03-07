import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('create new blog', async () => {
  const mockHandler = vi.fn()

  render(
    <CreateBlog
      createBlogApp={mockHandler()}
    />
  )
  const button = screen.getByText('create')
  userEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})