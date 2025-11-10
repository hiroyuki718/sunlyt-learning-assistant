import { type FormEvent, useMemo, useState } from 'react'
import './App.css'

type ScheduleItem = {
  title: string
  room: string
  time: string
  badge?: 'now' | 'new'
}

type Assessment = {
  title: string
  course: string
  due: string
  type: 'quiz' | 'exam'
}

type ChatMessage = {
  id: string
  from: 'assistant' | 'student'
  text: string
  time: string
}

const schedule: ScheduleItem[] = [
  { title: 'Algebra II', room: 'Room 204', time: '8:00 AM' },
  { title: 'English Literature', room: 'Room 105', time: '9:30 AM' },
  { title: 'Chemistry', room: 'Lab 3', time: '11:00 AM', badge: 'now' },
  { title: 'World History', room: 'Room 301', time: '1:00 PM' },
  { title: 'Spanish II', room: 'Room 210', time: '2:30 PM' },
]

const assessments: Assessment[] = [
  { title: 'Quadratic Equations', course: 'Algebra II', due: 'Tomorrow', type: 'quiz' },
]

const baseMessages: ChatMessage[] = [
  {
    id: '1',
    from: 'assistant',
    text: `Hi! I'm Sunlyt, your AI tutor. I can help you with homework, explain concepts, and prepare for tests. What would you like to work on today?`,
    time: '12:55 PM',
  },
  {
    id: '2',
    from: 'student',
    text: 'Can you help me understand quadratic equations?',
    time: '12:56 PM',
  },
  {
    id: '3',
    from: 'assistant',
    text: `Of course! A quadratic equation is written as ax² + bx + c = 0. There are three main ways to solve them:\n\n1. Factoring\n2. Completing the square\n3. Quadratic formula\n\nWhich method would you like to explore first?`,
    time: '12:57 PM',
  },
]

function App() {
  const [showHint, setShowHint] = useState(false)
  const [response, setResponse] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)

  const messages = useMemo(() => {
    if (!submitted) {
      return baseMessages
    }
    return [
      ...baseMessages,
      {
        id: '4',
        from: 'student' as const,
        text: submitted,
        time: '12:59 PM',
      },
      {
        id: '5',
        from: 'assistant' as const,
        text: `Great effort! Compare your steps with the guided solution on the left. Let me know if you'd like another problem.`,
        time: '1:00 PM',
      },
    ]
  }, [submitted])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!response.trim()) {
      return
    }
    setSubmitted(response.trim())
    setResponse('')
  }

  const handleNextQuestion = () => {
    setSubmitted(null)
    setShowHint(false)
    setResponse('')
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            🎓
          </div>
          <div className="brand-text">
            <h1>Sunlyt</h1>
            <p>Your Personal Learning Assistant</p>
          </div>
        </div>
        <div className="course-select">
          <span className="course-label">Algebra II</span>
          <span className="course-badge">Active</span>
        </div>
      </header>

      <main className="dashboard">
        <aside className="sidebar">
          <section aria-labelledby="schedule-heading">
            <div className="section-title">
              <span className="section-icon" aria-hidden="true">
                📅
              </span>
              <h2 id="schedule-heading">Schedule</h2>
            </div>
            <h3 className="section-subtitle">Today&apos;s Classes</h3>
            <ul className="schedule-list">
              {schedule.map((item) => (
                <li
                  key={item.title}
                  className={`schedule-card ${item.badge === 'now' ? 'active' : ''}`}
                >
                  <div>
                    <p className="schedule-time">{item.time}</p>
                    <p className="schedule-title">{item.title}</p>
                    <p className="schedule-room">{item.room}</p>
                  </div>
                  {item.badge && (
                    <span className={`schedule-badge ${item.badge}`}>{item.badge === 'now' ? 'Now' : 'New'}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="assessments-heading" className="assessments">
            <h3 id="assessments-heading">Upcoming Assessments</h3>
            <ul className="assessment-list">
              {assessments.map((assessment) => (
                <li key={assessment.title} className="assessment-card">
                  <span className={`assessment-type ${assessment.type}`}>{assessment.type}</span>
                  <div>
                    <p className="assessment-title">{assessment.title}</p>
                    <p className="assessment-meta">
                      {assessment.course} • {assessment.due}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <section className="practice">
          <header className="practice-header">
            <div>
              <p className="practice-progress">Question 1 of 5</p>
              <div className="practice-tags">
                <span>short answer</span>
              </div>
            </div>
            <div className="practice-course">Algebra II</div>
          </header>

          <article className="practice-card">
            <h2>Question 1</h2>
            <p className="practice-question">Solve for x: 2x² - 8x + 6 = 0</p>
            <button type="button" className="hint-button" onClick={() => setShowHint((prev) => !prev)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && (
              <div className="hint">
                Think about factoring out any common terms first. What factor do all coefficients share?
              </div>
            )}

            <form className="response-form" onSubmit={handleSubmit}>
              <label htmlFor="response" className="response-label">
                Your Response
              </label>
              <textarea
                id="response"
                className="response-input"
                placeholder="Type your answer here..."
                value={response}
                onChange={(event) => setResponse(event.target.value)}
              />
              <div className="response-actions">
                <button type="submit" className="primary">
                  Submit Answer
                </button>
                <button type="button" onClick={handleNextQuestion} className="secondary">
                  Next Question
                </button>
              </div>
            </form>
          </article>

          <section className="solution-card" aria-live="polite">
            <h3>Step-by-Step Solution</h3>
            <ol>
              <li>Factor out the common factor of 2: 2(x² - 4x + 3) = 0</li>
              <li>Set each factor equal to zero: x² - 4x + 3 = 0</li>
              <li>Factor the trinomial: (x - 3)(x - 1) = 0</li>
              <li>Solutions: x = 3 or x = 1</li>
            </ol>
          </section>
        </section>

        <section className="assistant">
          <header className="assistant-header">
            <div className="section-title">
              <span className="section-icon" aria-hidden="true">
                🤖
              </span>
              <h2>Sunlyt Assistant</h2>
            </div>
          </header>

          <ul className="chat-thread">
            {messages.map((message) => (
              <li key={message.id} className={`chat-message ${message.from}`}>
                <div className="chat-bubble">
                  {message.text.split('\n').map((segment, index) => (
                    <p key={index}>{segment}</p>
                  ))}
                </div>
                <span className="chat-time">{message.time}</span>
              </li>
            ))}
          </ul>

          <footer className="chat-input">
            <textarea placeholder="Ask Sunlyt anything..." disabled />
            <button type="button" disabled>
              Coming Soon
            </button>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
