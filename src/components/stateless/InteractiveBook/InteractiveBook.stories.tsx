import type { Meta, StoryObj } from '@storybook/react-vite'
import InteractiveBook, { InteractiveBookProps } from './index.tsx'

// Sample book pages content
const bookPages = [
  {
    pageNumber: 1,
    title: 'Chapter 1: The Beginning',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "The most important characteristics of good design are discoverability and understanding. Discoverability: Is
          it possible to even figure out what actions are possible?"
        </p>
        <p>
          "Understanding: What does it all mean? How is the product supposed to be used? What do all the different
          controls and settings mean?"
        </p>
        <p>
          "Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs
          so well that the design is invisible."
        </p>
      </div>
    ),
  },
  {
    pageNumber: 2,
    title: 'Chapter 2: The Psychology',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "When people try to use something, they first form a goal, then they plan an action, then they execute the
          action. Then they perceive what happened, interpret the result, and compare it with the goal."
        </p>
        <p>"This is the seven stages of action. It forms the core of human-computer interaction psychology."</p>
        <p>
          "The gulf of execution is the gap between the user's intentions and the allowable actions. The gulf of
          evaluation is the gap between the system's representation and the user's expectations."
        </p>
      </div>
    ),
  },
  {
    pageNumber: 3,
    title: 'Chapter 3: Knowledge',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "Knowledge is in the head and in the world. Precise behavior can emerge from imprecise knowledge for four
          reasons:"
        </p>
        <ul
          style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <li>Information is in the world</li>
          <li>Great precision is not required</li>
          <li>Natural constraints are present</li>
          <li>Cultural constraints are present</li>
        </ul>
        <p>
          "The principle of mapping: The relationship between controls and their effects should be clear and
          consistent."
        </p>
      </div>
    ),
  },
  {
    pageNumber: 4,
    title: 'Chapter 4: Constraints',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "Constraint: specific limits on possible actions. Constraints guide our behavior by limiting the possible
          options."
        </p>
        <p>
          "Physical constraints rely on the properties of the physical world for their operation. Semantic constraints
          rely on the meaning of the situation."
        </p>
        <p>
          "Cultural constraints are learned conventions that constrain our behavior. Logical constraints rely on the
          reasoning that certain actions are possible."
        </p>
      </div>
    ),
  },
  {
    pageNumber: 5,
    title: 'Chapter 5: Design Principles',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"Visibility: The more visible functions are, the more likely users will be able to know what to do next."</p>
        <p>"Feedback: Feedback must be immediate, informative, and clear. It should also be as obvious as possible."</p>
        <p>
          "Affordance: The perceived and actual properties of the thing that determine how the thing could possibly be
          used."
        </p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px', color: '#6b7280' }}>
          Design Principles
        </h3>
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>Continued on next page</p>
      </div>
    ),
  },
  {
    pageNumber: 6,
    title: 'Chapter 6: Error Prevention',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "Error prevention is the best way to deal with errors. If you can prevent errors from happening, you don't
          need to worry about error messages."
        </p>
        <p>"Four types of errors: slips, mistakes, errors of omission, and errors of commission."</p>
        <p>
          "Slips are unconscious errors where the user intends to do one thing but does another. Mistakes are conscious
          errors where the user has the wrong goal."
        </p>
      </div>
    ),
  },
  {
    pageNumber: 7,
    title: 'Chapter 7: Human-Centered Design',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>
          "Human-centered design is an approach to problem-solving that starts with people and ends with innovative
          solutions that are tailor-made to fit their needs."
        </p>
        <p>"The process involves three phases: inspiration, ideation, and implementation."</p>
        <p>
          "Empathy is at the heart of human-centered design. Understanding the people you're designing for is crucial to
          creating meaningful solutions."
        </p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>The journey of design excellence continues...</p>
      </div>
    ),
  },
  {
    pageNumber: 8,
    title: 'Conclusion',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p>"Design is not just what it looks like and feels like. Design is how it works."</p>
        <p>
          "The best designs are those that are invisible to the user. They work so well that the user doesn't notice the
          design - they just notice that it works."
        </p>
        <p style={{ fontStyle: 'italic', textAlign: 'center', marginTop: '24px', color: '#6b7280' }}>— Steve Jobs</p>
      </div>
    ),
    backContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#9ca3af' }}>End of Book</p>
      </div>
    ),
  },
]

const meta: Meta<typeof InteractiveBook> = {
  title: 'Stateless/InteractiveBook',
  component: InteractiveBook,
  argTypes: {
    bookTitle: { control: 'text' },
    bookAuthor: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof InteractiveBook>

export const Default: Story = {
  render: (args: InteractiveBookProps) => (
    <div className="flex h-[800px] w-full items-center justify-center bg-neutral-100 p-10">
      <InteractiveBook {...args} />
    </div>
  ),
  args: {
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    bookTitle: 'The Design of Everyday Things',
    bookAuthor: 'Don Norman',
    pages: bookPages,
    width: 350,
    height: 500,
  },
}
