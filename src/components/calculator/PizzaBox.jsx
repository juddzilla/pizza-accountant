import { useState } from 'react';

export default ({ currency, option, unit, update }, results) => {
  console.log('res', results);
  let [values, setValues] = useState(option);
  let ranking = 0;

  const resultIndex = results.ranking.findIndex(result => parseInt(result.pizza, 10) === values.id)

  if (resultIndex !== -1) {
    ranking = resultIndex + 1;
  }

  const parseNumber = (str) => {
    if (isNaN(str) || !str || !str.trim().length) {
      return 0;
    }
    const matched = str.replace(/\b0+/g, '').match(/^\d*(\.\d{0,2})?$/);
    if (matched && matched[0] !== '') {
      return matched[0];
    }
    return null;
  };

  function updatePer(newValues) {
    let area = 0;
    let per = null;

    if ([
      !newValues.cost,
      (newValues.shape === 'circle' && !newValues.dimensions[0]),
      (newValues.shape === 'rectangle' && newValues.dimensions.some(d => d === 0)),
    ].every(j => j === false)) {
      if (newValues.shape === 'circle') {
        const diameter = newValues.dimensions[0];
        area = Math.PI * ((parseInt(diameter, 10) / 2) * (parseInt(diameter, 10) / 2));
      } else {
        area = newValues.dimensions[0] * newValues.dimensions[1];
      }
      per = newValues.cost / area;
    }

    setValues({ ...newValues, area, per });
    update({ ...newValues, area, per });
  }

  function updateDimensions(value, position) {
    const dimensions = values.dimensions;

    let newValue = parseNumber(value);
    if (newValue === null) {
      newValue = values.dimensions[position];
    }

    dimensions[position] = newValue;

    updatePer({ ...values, dimensions });
  }

  function updateKey(key, value) {
    updatePer({ ...values, [key]: value });
  }

  function updateCost(value) {
    let newValue = parseNumber(value);
    if (newValue === null) {
      newValue = values['cost'];
    }

    updateKey('cost', newValue);
  }

  function onShapeChange(shape) {
    updatePer({ ...values, dimensions: [0,0], shape });
  }

  const Shapes = () => {
    const strokeColor = (shape) => values.shape === shape ? 'stroke-black' : 'stroke-gray-300';

    return (
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Shape
            </label>
            <select
                id="shape-select"
                name="shapes"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue='in'
                onChange={ ({ target }) => onShapeChange(target.value) }
            >
              <option value='circle'>
                Circle
              </option>
              <option value='rectangle'>
                Rectangle
              </option>
            </select>
          </div>
          <div className="hidden sm:flex mr-4 rounded-md">
            <div className='mb-4 flex items-center'>
              <span className="text-sm font-medium leading-6 w-16 text-gray-900 mr-2">
                Shape
              </span>
              <button
                  className='rounded-md p-1 text-sm font-medium'
                  onClick={ () => { onShapeChange('circle') } }
                  title='Circle'
              >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width='24' height='24' className={ strokeColor('circle') } >
                  <circle cx="12" cy="12" r="11" strokeWidth="2" fill="none" />
                </svg>
              </button>
              <button
                  className='rounded-md p-1 text-sm font-medium'
                  onClick={ () => { onShapeChange('rectangle') } }
                  title='Rectangle'
              >
                <svg width="24" height="24" className={ strokeColor('rectangle') } >
                  <rect width="20" height="18" x="2" y="3" fill='none' strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
    )
  }

  let classList = 'p-4';

  if (ranking === 1) {
    classList += ' bg-black';
  } else {
    classList += ' bg-gray-50';
  }

  switch (ranking) {
    case 1:

      break;
    case 2:
      classList += ' bg-gray-100';
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    case 3:
      classList += ' bg-gray-50';
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
  }

  function Ranking() {
    if (results.ranking.length === 1) {
      return null;
    }

    const rank = results.ranking[resultIndex];
    if (!rank) {
      return null;
    }

    let rankClassList = 'w-64 p-4';

    if (resultIndex === 0) {
      rankClassList += ' text-white';
    }

    let optionText = 'Best Option';


    if (resultIndex === 1) {
      optionText = 'Next Best Option'
    }

    if (resultIndex === 2) {
      optionText = 'Next Next Best Option'
    }

    return (
      <div className={ rankClassList }>
        <div>
          { optionText }
        </div>
        { Object.hasOwn(rank.comparison, 'next') &&
            <div> The cost per square { unit } is { rank.comparison.next.toFixed(1) }% less than the next best option.</div>
        }

        { Object.hasOwn(rank.comparison, 'previous') &&
            <div> The cost per square { unit } is { rank.comparison.previous.toFixed(1) }% greater than the previous better option.</div>
        }
      </div>
    );
  }

  return (
      <div className={ classList }>
        <div className='flex flex-col overflow-hidden w-64 h-64 rounded p-6 shadow-lg shadow-gray-900/5 bg-white'>
          { Shapes() }
          <div className='flex-1'>
            { values.shape === 'circle' &&
              <div className='mb-4 h-10 flex items-center'>
                <span className="text-sm font-medium leading-6 w-16 text-gray-900 mr-2">
                  Diameter
                </span>
                <div className="relative rounded-md shadow-sm flex border border-inset border-gray-300 flex-1">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 focus:outline-none !ring-transparent pr-12 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="0"
                    value={ values.dimensions[0] }
                    onChange={({ target }) => updateDimensions(target.value, 0)}
                    aria-describedby="pizza-diameter"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
            }

            { values.shape === 'rectangle' &&
            <>
              <div className='mb-4 h-10 flex items-center'>
                <span className="text-sm font-medium leading-6 w-16 text-gray-900 mr-2">
                  Width
                </span>
                <div className="relative rounded-md shadow-sm flex border border-inset border-gray-300 flex-1">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 focus:outline-none !ring-transparent pr-12 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="0"
                    value={ values.dimensions[0] }
                    onChange={({ target }) => updateDimensions(target.value, 0)}
                    aria-describedby="pizza-width"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
              <div className='mb-4 h-10 flex items-center'>
                <span className="text-sm font-medium leading-6 w-16 text-gray-900 mr-2">
                  Length
                </span>
                <div className="relative rounded-md shadow-sm flex border border-inset border-gray-300 flex-1">
                  <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 pl-2 focus:outline-none !ring-transparent pr-12 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="0"
                      value={ values.dimensions[1] }
                      onChange={({ target }) => updateDimensions(target.value, 1)}
                      aria-describedby="pizza-length"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
            </>
            }
          </div>
          <div className='h-10 pl-16 flex items-center'>
            <span className="text-sm font-medium leading-6 text-gray-900 mr-2">
              Cost
            </span>
            <div className="relative rounded-md shadow-sm flex border border-inset border-gray-300 flex-1">
              <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 focus:outline-none !ring-transparent pr-8 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="0"
                  value={ values.cost }
                  onChange={({ target }) => updateCost(target.value)}
                  aria-describedby="pizza-width"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm" id="price-currency">
                    { currency.symbol }
                  </span>
              </div>
            </div>
          </div>
        </div>
        { Ranking() }
      </div>
  )
}