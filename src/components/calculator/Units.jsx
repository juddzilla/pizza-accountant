export default function Units(value, update)  {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const units = ['in', 'cm'];

  return (
      <div className="mb-4">
        <div className="sm:hidden flex justify-center">
          <label htmlFor="tabs" className="sr-only">
            Unit
          </label>
          <select
              id="unit-select"
              name="units"
              className="block w-64 md:w-full rounded-md border-gray-300 focus:border-neutral-800 focus:ring-neutral-800"
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
        <div className="hidden sm:flex justify-center">
          <nav className="flex sm:justify-center w-64 rounded-md border bg-gray-50 border-gray-200" aria-label="Tabs">
            { units.map((unit) => (
                <button
                    key={ unit }
                    className={classNames(
                        value === unit ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-gray-50 border-gray-50 text-gray-500 hover:text-gray-700',
                        'rounded-md p-1.5 text-sm font-medium w-32 border'
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