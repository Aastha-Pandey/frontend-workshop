const AccordionItem = ({ item, isOpen, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className='flex flex-col space-y-1 hover:bg-pink-300 border border-solid border-pink-400 rounded-sm px-4 py-2'
    >
      <span className='text-pink-800 text-xl'>{item.label}</span>
      {isOpen && <p className='text-pink-800 text-sm'>{item.description}</p>}
    </button>
  )
}

export default AccordionItem
