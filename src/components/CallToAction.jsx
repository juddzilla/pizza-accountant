import { CircleBackground } from '@/components/CircleBackground';
import { Container } from '@/components/Container';

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            C'mon just do it
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            5
          </p>
          <p className="mt-4 text-lg text-gray-300">
            4
          </p>
          <p className="mt-4 text-lg text-gray-300">
            3
          </p>
          <p className="mt-4 text-lg text-gray-300">
            2
          </p>
          <p className="mt-4 text-lg text-gray-300">
            Do it! Go on then.
          </p>
        </div>
      </Container>
    </section>
  )
}
