import { useState } from 'react'
import AccordionItem from '../components/AccordionItem'

const Accordion = ({
  multiOpen = false,
  items = [
    {
      id: 1,
      label: 'Label 1',
      description: `An Accordion container that holds multiple AccordionItem components
Each item has a header/trigger (button) and a panel (content area)
Items can be independently expanded/collapsed`,
    },
    {
      id: 2,
      label: 'Label 2',
      description: `An Accordion container that holds multiple AccordionItem components
Each item has a header/trigger (button) and a panel (content area)
Items can be independently expanded/collapsed`,
    },
    {
      id: 3,
      label: 'Label 3',
      description: `An Accordion container that holds multiple AccordionItem components
Each item has a header/trigger (button) and a panel (content area)
Items can be independently expanded/collapsed`,
    },
  ],
}) => {
  const [openIds, setOpenIds] = useState(new Set())

  const handleToggle = (id) => {
    if (multiOpen) {
      setOpenIds((prev) => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    } else {
      setOpenIds((prev) => {
        const next = new Set()
        if (!prev.has(id)) next.add(id)
        return next
      })
    }
  }

  return (
    <div className='flex flex-col space-y-3'>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}

export default Accordion
