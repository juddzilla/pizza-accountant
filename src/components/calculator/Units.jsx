export default function(value, update)  {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const units = ['in', 'cm'];

  return (
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Unit
          </label>
          <select
              id="unit-select"
              name="units"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={ value }
              onChange={ ({ target }) => update(target.value) }
          >
            { units.map((unit) => (
                <option
                    key={ unit }
                    value={ unit }
                >
                  { unit }
                </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block mr-4">
          <nav className="flex rounded-md border border-gray-200" aria-label="Tabs">
            { units.map((unit) => (
                <button
                    key={ unit }
                    className={classNames(
                        value === unit ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                        'rounded-md p-1.5 text-sm font-medium w-24'
                    )}
                    onClick={ () => update(unit) }
                    title={ unit }
                >
                  { unit }
                </button>
            )) }
          </nav>
        </div>
      </div>
  )
}