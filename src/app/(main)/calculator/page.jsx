'use client'
import { useEffect, useState } from 'react';

import { CircleBackground } from '@/components/CircleBackground';
import { Container } from '@/components/Container';
import { Area, Per, Tastiness } from '@/components/calculator/Charts';
import Currencies from '@/components/calculator/Currencies';
import PizzaBox from '@/components/calculator/PizzaBox';
import Units from '@/components/calculator/Units';
import { currencies } from '@/components/calculator/Currencies';

const initialCurrency = currencies[0];

export default function Calculator() {
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
        per: pizza.per,
      }
    }

    const newResults = { ...results.pizzas };

    const sortedRanking = Object.keys(newResults)
        .map(key => ({
          pizza: parseInt(key, 10),
          ...newResults[key],
        }))
        .sort((a, b) => {
          if (a.per < b.per) {
            return -1;
          } else if (a.per > b.per) {
            return + 1;
          }
          return 0;
        });

    const ranking = sortedRanking.map((r, i, a) => {      
      if (a.length === 1) {
        return [];
      }

      const current = r.per;
      const comparison = {};

      if (a[i + 1]) {
        comparison.next = (1 / (a[i + 1].per / current)) * 100;
      }

      if (a[i - 1]) {
        comparison.previous = (1 / (a[i - 1].per / current)) * 100;
      }
      return { comparison, ...r };
    })

    setResults({ pizzas: { ...newResults }, ranking });
  }

  const pizzaBox = 'mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 mt-4 sm:mt-6 lg:max-w-none lg:grid-cols-3';
  const resultBox = 'bg-neutral-800 overflow-hidden rounded-lg p-4 shadow-2xl';

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
              <h2 className="text-3xl font-medium text-center tracking-tight text-white sm:text-4xl">
                Cost Benefit Analyzer
              </h2>
            </div>
          </Container>
        </section>
        <section
            id="calculator"
            aria-labelledby="pricing-title"
            className="border-t border-gray-200 py-20 sm:py-32"
        >
          <Container className='px-0'>
            <div className="mx-auto max-w-7xl">
              <div className='mx-auto max-w-2xl text-center'>
                <h2
                    id="pricing-title"
                    className="text-3xl font-medium tracking-tight text-gray-900"
                >
                  Happiness Calculator
                </h2>
              </div>
              <div className='mx-auto max-w-2xl text-center'>
                <p className="mt-2 text-lg text-gray-600">
                  Pizza Accountant is under a fiduciary duty to act in your best interests.
                  With some basic information, we calculate the pizza with the best
                  <sup className='ml-2 inline-block'>{ currency.symbol }</sup>
                  <span className='inline-block mx-1'>&#8725;</span>
                  <sub>{ unit }</sub>
                  <sup className='inline-block mr-1.5'>2</sup>
                </p>
                <p className="mt-2 text-md text-gray-500">
                  Is what we would say if we were actual accountants, but we still feel the same.
                </p>
              </div>
            </div>

            <div className='mx-auto max-w-xl text-center my-8 md:flex justify-center sm:px-6 lg:px-8'>
              <div className="">
                { Currencies(currency, setCurrency) }
              </div>
              <div className="">
                { Units(unit, setUnit) }
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative px-4 sm:px-6 lg:px-8">
                <div className='mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-3'>
                  { pizzas.map((pizza, index) => {
                    const data = {
                      currency,
                      index,
                      option: pizza,
                      unit,
                      update: updatePizza,
                    };
                    return (
                        <div key={index} className='mb-6 md:mb-0'>
                          { PizzaBox(data, results) }
                        </div>
                    )
                  }) }
                </div>
              </div>
            </div>
            { results.ranking.length > 1 &&
              <div className="flex justify-center">
                <div className="lg:px-8 px-4 relative text-white">
                  <div className={ pizzaBox }>
                    <div className={ resultBox }>
                      <div className='bg-white flex p-4 flex-col overflow-hidden sm:w-64 h-64 relative'>
                        { Area(results.ranking, currency, unit) }
                      </div>
                    </div>
                    <div className={ resultBox }>
                      <div className='bg-white p-4 flex flex-col overflow-hidden sm:w-64 h-64 relative'>
                        { Per(results.ranking, currency, unit) }
                      </div>
                    </div>
                    <div className={ resultBox }>
                      <div className='bg-white p-4 flex flex-col overflow-hidden sm:w-64 h-64 relative'>
                        { Tastiness() }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </Container>
        </section>
      </>
  )
}