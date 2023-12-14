import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Be honest with me, magic?',
      answer:
        "Give a man a fish, he'll smell like fish for a while.  Teach a man to fish, ain't nobody got time for that",
    },
    {
      question: 'On a scale of 1 to 30, how fun is this?',
      answer:
        '31',
    },
    {
      question: 'Is this innovention (copyright Jack Donaghy) 1000% yours?',
      answer:
        'The website and app, maybe.  The mathematics? Absolutely. Not. Absolutely not.',
    },
  ],
  [
    {
      question: "I'd like to give you a tip",
      answer:
        "That's not a question",
    },
    {
      question: 'How can I leave you a tip?',
      answer:
        'Check in the footer for a link',
    },
    {
      question: 'Is this safe for my mom?',
      answer:
        'Yes and no.',
    },
  ],
  [
    {
      question: 'Can we expect an App?',
      answer:
        'Unexepectedly you can',
    },
    {
      question: 'ELI5',
      answer:
        'Based on the size of the pizza, and the cost of the pizza, we tell you which pizza is a better value',
    },
    {
      question: 'How do I join?',
      answer:
        'We will contact you.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
