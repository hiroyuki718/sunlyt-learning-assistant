import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders schedule and practice workspace content', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { name: /sunlyt/i })).toHaveLength(2)
    expect(screen.getByText(/Question 1 of 5/i)).toBeInTheDocument()
    expect(screen.getByText(/Solve for x: 2x² - 8x \+ 6 = 0/i)).toBeInTheDocument()
    expect(screen.getByText(/Sunlyt Assistant/i)).toBeInTheDocument()
  })

  it('allows hint toggling and submitting an answer', async () => {
    const user = userEvent.setup()
    render(<App />)

    const hintButton = screen.getByRole('button', { name: /show hint/i })
    await user.click(hintButton)

    expect(
      screen.getByText(/Think about factoring out any common terms first/i),
    ).toBeInTheDocument()

    const responseInput = screen.getByLabelText(/your response/i)
    await user.type(responseInput, 'x = 3 or x = 1')
    await user.click(screen.getByRole('button', { name: /submit answer/i }))

    expect(responseInput).toHaveValue('')
    expect(
      screen.getByText(/Great effort! Compare your steps with the guided solution/i),
    ).toBeInTheDocument()
  })
})

