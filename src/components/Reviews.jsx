'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useInView } from 'framer-motion'

import { Container } from '@/components/Container'

const reviews = [
  {
    title: 'I might be alone still, but I know I made at least 1 right choice in life.',
    body: "I don't like making decisions.  You might say I'm indecisive.  But you might not, I don't know, let me think about it before I give you a final answer",
    author: 'TobyDeterman',
    rating: 5,
  },
  {
    title: 'Putting the "I" in pIzza',
    body: "At first I was like why? Then I was like how?  Then I was like when? Now I'm like wow.",
    author: 'PizzaClown',
    rating: 5,
  },
  {
    title: 'This shouldn’t be a thing',
    body: 'But thankfully it is.',
    author: 'XLDoubleCheeze',
    rating: 5,
  },
  {
    title: 'Fire all of your other Pizza Accountants',
    body: 'Step one: Profit! Step Two: Spend profits.',
    author: 'JuanDosStep',
    rating: 5,
  },
  {
    title: '5 Stars',
    body: "Just like how I say 'Knock Knock' when I enter rooms, I'm saying 5 Stars!",
    author: 'AstroNut',
    rating: 5,
  },
  {
    title: 'I never believed in soulapps',
    body: "That's like a soulmate for apps tho. That's what I meant by that.",
    author: 'HollyDarton',
    rating: 5,
  },
  {
    title: 'Pizza Delivers Yet Again!',
    body: "I told them that if I see a joke on the underside of the box I'll leave them a bit tip next time.  They taped the shiny side of the foil to the underside of the lid. Jokes on you, my mother calls me that all the time.",
    author: 'PizzaClownJr',
    rating: 5,
  },
  {
    title: 'Pizza is not unlike an island',
    body: "It's not overly like an island, but it's also not underly like an island either.",
    author: 'CantSwimSendHemp',
    rating: 5,
  },
  {
    title: "It's like having the opposite of a caloric deficit",
    body: 'I used to be a hungry. But not anymore.  Not now, not ever, not for at least 45 minutes.',
    author: 'Mint',
    rating: 5,
  },
  {
    title: "Teachers used to say we wouldn't have a calculator in our pockets on us in the future.",
    body: "They also said lunch was at 12:30. Wrong! it's whenever the pizza get's here.",
    author: '314zza',
    rating: 5,
  },
  {
    title: 'The longer you wait, the waiter longs for you longer. Wait.',
    body: "What is the hype about you ask? I'll tell what the hype is about",
    author: 'FinishYourSentenc',
    rating: 5,
  },
  {
    title: 'POW! ZING! WOMP!',
    body: 'BAM! WHOOSH! BZZZZZ!',
    author: 'SoundGuy',
    rating: 5,
  },
  {
    title: 'Retirement is around the corner now',
    body: 'Ate too much, gotta lay down',
    author: 'HHHippo',
    rating: 5,
  },
  {
    title: "Desert island app",
    body: "If that's what you're looking for, look further.",
    author: 'Dot',
    rating: 5,
  },
]

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            'h-5 w-5',
            rating > index ? 'fill-option-1' : 'fill-gray-300',
          )}
        />
      ))}
    </div>
  )
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ]
  }, [])

  return (
    <figure
      className={clsx(
        'animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5',
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  )
}

function splitArray(array, numParts) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts
    if (!result[index]) {
      result[index] = []
    }
    result[index].push(array[i])
  }
  return result
}

function ReviewColumn({ reviews, className, reviewClassName, msPerPixel = 0 }) {
  let columnRef = useRef(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (!columnRef.current) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx('animate-marquee space-y-8 py-4', className)}
      style={{ '--marquee-duration': duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  )
}

function ReviewGrid() {
  let containerRef = useRef(null)
  let isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = splitArray(reviews, 3)
  let column1 = columns[0]
  let column2 = columns[1]
  let column3 = splitArray(columns[2], 2)

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= column1.length + column3[0].length &&
                  'md:hidden',
                reviewIndex >= column1.length && 'lg:hidden',
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50" />
    </div>
  )
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-3xl font-medium tracking-tight text-gray-900 sm:text-center"
        >
          Come full circle with Pizza Accountant
        </h2>
        <p className="mt-2 text-lg text-gray-600 sm:text-center">
          Thousands upon thousands uopn dozens of grains fo flour can&apos;t all be wrong. Can they?
        </p>
        <ReviewGrid />
      </Container>
    </section>
  )
}
