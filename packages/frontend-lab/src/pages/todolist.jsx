import { useCallback, useState } from 'react'
const STATUS = [
  { label: 'all', defaultStyle: 'bg-fuchsia-700 text-fuchsia-200' },
  { label: 'pending', defaultStyle: 'bg-yellow-700 text-yellow-200' },
  { label: 'completed', defaultStyle: 'bg-green-700 text-green-200' },
  { label: 'cancelled', defaultStyle: 'bg-red-700 text-red-200' },
]
const TodoList = () => {
  const [list, setList] = useState([])
  const [item, setItem] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const renderedList =
    selectedFilter !== 'all'
      ? list.filter((ele) => ele.status === selectedFilter)
      : list

  const handleAddItem = useCallback(() => {
    if (item && item.trim()) {
      setList((prevList) => [
        ...prevList,
        {
          id: crypto.randomUUID(),
          action: item,
          status: 'pending',
        },
      ])
      setItem('')
    }
  }, [item])

  return (
    <section className='items-center min-h-screen flex-col space-y-6 justify-center flex'>
      <p className={`text-4xl text-fuchsia-800 `}>ToDo</p>
      <div className='flex space-x-2 items-center'>
        {STATUS.map((status, i) => (
          <button
            onClick={() => {
              setSelectedFilter(status.label)
            }}
            key={i}
            className={`rounded-full px-2 py-1 ${status.defaultStyle}  ${status.label === selectedFilter && ' border-solid border-2 border-fuchsia-900'} flex items-center justify-center text-center text-sm`}
          >
            {status.label}
          </button>
        ))}
      </div>
      <div className='flex flex-col space-y-3 bg-white'>
        <div className='flex flex-col space-y-3  h-58 overflow-auto'>
          {renderedList.length === 0 && (
            <p className={`text-2xl text-fuchsia-800 `}>
              {selectedFilter === 'all'
                ? 'Add Actions!'
                : ` No ${selectedFilter} actions!`}
            </p>
          )}
          {renderedList.map((item) => (
            <div
              key={item.id}
              className='flex justify-between items-center  px-2 py-1 border border-solid border-fuchsia-400 rounded-sm'
            >
              <p
                className={` text-sm text-fuchsia-800 ${item.status === 'completed' && 'line-through'}`}
              >
                {item.action}
              </p>
              <div className='flex space-x-2 items-center'>
                {item.status !== 'cancelled' && (
                  <button
                    onClick={() => {
                      setList(list.map((todo) =>
                        todo.id === item.id
                          ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' }
                          : todo
                      ))
                    }}
                    className={`${item.status === 'completed' ? 'bg-gray-600' : 'bg-green-600'} text-white rounded-sm px-2 py-1 text-sm`}
                  >
                    {item.status === 'completed' ? 'Undo' : 'Done'}
                  </button>
                )}
                {item.status !== 'completed' && (
                  <button
                    onClick={() => {
                      setList(list.map((todo) =>
                        todo.id === item.id
                          ? { ...todo, status: todo.status === 'cancelled' ? 'pending' : 'cancelled' }
                          : todo
                      ))
                    }}
                    className={`${item.status === 'cancelled' ? 'bg-gray-600' : 'bg-red-600'} text-white text-sm rounded-sm px-2 py-1`}
                  >
                    {item.status === 'cancelled' ? 'Restore' : 'Cancel'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center space-x-3 border border-solid border-fuchsia-400 rounded-sm px-2 py-2  max-h-28'>
          <textarea
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleAddItem()
              }
            }}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className='focus:outline-fuchsia-400 text-fuchsia-800 p-2 text-sm'
          ></textarea>
          <button
            disabled={!item.trim()}
            onClick={handleAddItem}
            className={`${!item.trim() ? 'cursor-not-allowed bg-gray-300' : 'bg-fuchsia-600'} text-white rounded-sm px-2 py-1 text-sm`}
          >
            Add Item
          </button>
        </div>
      </div>
    </section>
  )
}

export default TodoList
