'use client'
import { useEffect, useState } from 'react'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import Currencies from '@/components/calculator/Currencies';
import PizzaBox from '@/components/calculator/PizzaBox';
import Units from '@/components/calculator/Units';
import { currencies } from '@/components/calculator/Currencies';

const initialCurrency = currencies[0];

export default () => {
  const pizza = (x, i) => ({
    area: 0,
    cost: 0,
    currency: 'USD',
    dimensions: [0, 0],
    id: i,
    isEditting: false,
    per: null,
    shape: 'circle',
    unit: 'in',
  });

  const pizzas = [...Array(3)].map(pizza);

  let [currency, setCurrency] = useState({ code: initialCurrency.code, name: initialCurrency.name, symbol: initialCurrency.symbolNative });
  let [unit, setUnit] = useState('in');
  let [results, setResults] = useState({ pizzas: {}, ranking: [] });

  function updatePizza(pizza) {
    if (pizza.per === null) {
      if (Object.hasOwn(results.pizzas, pizza.id)) {
        delete results.pizzas[pizza.id];
      }
    } else {
      results.pizzas[pizza.id] = {
        area: pizza.area,
        per: pizza.per * 100,
      }
    }

    const newResults = { ...results.pizzas };

    const sortedRanking = Object.keys(newResults)
        .map(key => ({
          pizza: key,
          value: newResults[key],
        }))
        .sort((a, b) => {
          if (a.value.per < b.value.per) {
            return -1;
          } else if (a.value.per > b.value.per) {
            return + 1;
          }
          return 0;
        });
    console.log('ranking', sortedRanking);

    const ranking = sortedRanking.map((r, i, a) => {
      console.log(1, r, i, a);
      if (a.length === 1) {
        return [];
      }

      const current = r.value.per;
      const comparison = {};

      if (a[i + 1]) {
        comparison.next = (1 / (a[i + 1].value.per / current)) * 100;
      }

      if (a[i - 1]) {
        comparison.previous = (1 / (a[i - 1].value.per / current)) * 100;
      }
      return { comparison, ...r };
    })

    setResults({ pizzas: { ...newResults }, ranking });
  }

  return (
      <>
        <section
            id="calculator-view"
            className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
        >
          <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
            <CircleBackground color="#fff" className="animate-spin-slower" />
          </div>
          <Container className="relative">
            <div className="mx-auto max-w-md sm:text-center">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Cost Benefit Analyzer
              </h2>
            </div>
          </Container>
        </section>
        <section
            id="calculator"
            aria-labelledby="pricing-title"
            className="border-t border-gray-200 bg-gray-100 py-20 sm:py-32"
        >
          <Container>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className='mx-auto max-w-2xl text-center'>
                <h2
                    id="pricing-title"
                    className="text-3xl font-medium tracking-tight text-gray-900"
                >
                  Pizza is round, pricing is flat. Well, it's round, but flat also.
                </h2>
              </div>
              <div className='mx-auto max-w-2xl text-center'>
                <p className="mt-2 text-lg text-gray-600">
                  Whether you’re one person trying to get 2 pizzas, or two people trying to get 1, Pizza Accountant will guide you in a direction.
                </p>
              </div>
            </div>

            <div className='mx-auto max-w-xl text-center mt-8 flex justify-center'>
              <div className="">
                { Currencies(currency, setCurrency) }
              </div>
              <div className="">
                { Units(unit, setUnit) }
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">

                <div className='mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-8 lg:max-w-none lg:grid-cols-3'>
                  { pizzas.map((pizza, index) => {
                    const data = {
                      currency,
                      option: pizza,
                      unit,
                      update: updatePizza,
                    };
                    return (
                        <div key={index}>
                          { PizzaBox(data, results) }
                        </div>
                    )
                  }) }
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
  )
}