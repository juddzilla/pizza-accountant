import { useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

export default ({ currency, index, option, unit, update }, results) => {
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
    const strokeColor = (shape) => values.shape === shape ? 'stroke-black' : 'stroke-gray-300 hover:stroke-black';

    return (
        <div className='flex-1'>
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
          <div className="hidden sm:flex rounded-md justify-end">
            <div className='flex items-center'>
              <span className={ `${ styles.inputContainer } h-10`}>
                <button
                    className='rounded-md py-1 px-2 text-sm font-medium w-6/12 flex justify-center'
                    onClick={ () => { onShapeChange('circle') } }
                    title='Circle'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width='24' height='24' className={ strokeColor('circle') } >
                    <circle cx="12" cy="12" r="11" strokeWidth="2" fill="none" />
                  </svg>
                </button>
                <button
                    className='rounded-md py-1 px-2 text-sm font-medium w-6/12 flex justify-center'
                    onClick={ () => { onShapeChange('rectangle') } }
                    title='Rectangle'
                >
                  <svg width="24" height="24" className={ strokeColor('rectangle') } >
                    <rect width="20" height="18" x="2" y="3" fill='none' strokeWidth="2"/>
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
    )
  }

  let classList = 'p-4 shadow-2xl';

  if (ranking === 1) {
    classList += ' bg-black';
  } else {
    classList += ' bg-gray-50';
  }

  function Ranking() {
    if (results.ranking.length === 1) {
      return null;
    }

    const rank = results.ranking[resultIndex];
    if (!rank) {
      return null;
    }

    let rankClassList = 'sm:w-64 p-4 sm:text-sm';

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

    let comparators = ['Next Best Option'];

    if (resultIndex === 1) {
      if (results.ranking.length === 2) {
        comparators.unshift('Best Option');
      } else if (results.ranking.length === 3) {
        comparators = ['Next Next Best Option', 'Best Option'];
      }
    } else if (resultIndex === 2) {
      comparators.unshift(' ');
    }

    return (
      <div className={ rankClassList }>
        <div className='text-lg text-center mb-2 font-semibold'>
          { optionText }
        </div>
        <div className='flex justify-center mb-4 md:mb-2'>
          <div>
            Total { unit }<sup>2</sup>: { rank.area.toFixed(2) }
          </div>
        </div>
        <div className=''>
          {/*<sup className='inline-block'>{ currency.symbol }</sup>*/}
          <span className='inline-block'>{ currency.symbol }{ rank.per.toFixed(3) }</span>
          <span className='inline-block mx-1'>&#8725;</span>
          <sub>{ unit }</sub>
          <sup className='inline-block mr-1.5'>2</sup>
          is  which is
          { Object.hasOwn(rank.comparison, 'next') &&
              <>
                <span className='inline-block mx-1'>
                  { rank.comparison.next.toFixed(0) }% &lt;
                </span>
                the { comparators[0] }
              </>
          }

          { (Object.hasOwn(rank.comparison, 'next') && Object.hasOwn(rank.comparison, 'previous')) &&
              <span className='inline-block mx-1'>
                but
              </span>
          }

          { Object.hasOwn(rank.comparison, 'previous') &&
              <>
                <span className='inline-block mx-1'>
                  { rank.comparison.previous.toFixed(0) }% &gt;
                </span>
                the { comparators[1] }
              </>
          }
        </div>
      </div>
    );
  }

  const label = 'text-sm font-medium leading-6  items-center justify-center'
  const styles = {
    columnLabel: `${ label } w-20 mr-2 text-gray-900 h-10 flex `,
    indexLabel: `${ label } border border-gray-200 flex items-center justify-center rounded-full h-10 w-10 font-bold text-black text-lg`,
    input: 'block w-full rounded-md border-0 py-1.5 pl-2 focus:outline-none !ring-transparent pr-12 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6',
    inputContainer: 'relative rounded-md shadow-sm flex items-center border border-inset border-gray-100 flex-1 hover:border-gray-700',
    row: 'mb-4 h-10 flex items-center',
    unitContainer: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
    unit: 'text-gray-500 sm:text-sm',
  };

  return (
      <div className={ classList }>
        <div className='flex flex-col overflow-hidden sm:w-64 h-64 rounded p-4 shadow-lg shadow-gray-900/5 bg-white'>
          <div className={ styles.row }>
            <span className='w-20 mr-2'>
              <span className={ styles.indexLabel }>{ index + 1 }</span>
            </span>
            { Shapes() }
          </div>
          <div className=''>
            { values.shape === 'circle' &&
              <div className={ styles.row }>
                <span className={ styles.columnLabel }>
                  Diameter
                </span>
                <div className={ styles.inputContainer }>
                  <input
                    type="text"
                    className={ styles.input }
                    placeholder="0"
                    value={ values.dimensions[0] }
                    onChange={({ target }) => updateDimensions(target.value, 0)}
                    aria-describedby="pizza-diameter"
                  />
                  <div className={ styles.unitContainer }>
                    <span className={ styles.unit }>
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
            }

            { values.shape === 'rectangle' &&
            <>
              <div className={ styles.row }>
                <span className={ styles.columnLabel }>
                  {/*<ArrowLongLeftIcon className='absolute' width='32' length='32' />*/}
                  {/*<ArrowLongRightIcon className='absolute' width='32' length='32' />*/}
                  Width
                </span>
                <div className={ styles.inputContainer }>
                  <input
                    type="text"
                    className={ styles.input }
                    placeholder="0"
                    value={ values.dimensions[0] }
                    onChange={({ target }) => updateDimensions(target.value, 0)}
                    aria-describedby="pizza-width"
                  />
                  <div className={ styles.unitContainer }>
                    <span className={ styles.unit }>
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
              <div className={ styles.row }>
                <span className={ styles.columnLabel }>
                  Length
                </span>
                <div className={ styles.inputContainer }>
                  <input
                      type="text"
                      className={ styles.input }
                      placeholder="0"
                      value={ values.dimensions[1] }
                      onChange={({ target }) => updateDimensions(target.value, 1)}
                      aria-describedby="pizza-length"
                  />
                  <div className={ styles.unitContainer }>
                    <span className={ styles.unit }>
                      { unit }
                    </span>
                  </div>
                </div>
              </div>
            </>
            }
          </div>
          <div className={ styles.row }>
            <span className={ styles.columnLabel }>
              Cost
            </span>
            <div className={ styles.inputContainer }>
              <input
                  type="text"
                  className={ styles.input }
                  placeholder="0"
                  value={ values.cost }
                  onChange={({ target }) => updateCost(target.value)}
                  aria-describedby="pizza-width"
              />
              <div className={ styles.unitContainer }>
                  <span className={ styles.unit }>
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