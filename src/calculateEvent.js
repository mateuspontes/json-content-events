import { addedDiff, deletedDiff, updatedDiff } from './deepObjectDiff'

export default function calculateEvent(originalDocument, editedDocument) {
  const added = addedDiff(originalDocument, editedDocument)
  const deleted = deletedDiff(originalDocument, editedDocument)
  const updated = updatedDiff(originalDocument, editedDocument)

  console.info('added,', JSON.stringify(added, null, 2))
  const addedEvents = []
  if (Object.keys(added).length) {
    for (const event of Object.keys(added.blocks)) {
      addedEvents.push({
        type: 'addedItem',
        data: {
          path: `blocks.${event}`,
          value: {
            ...added.blocks[event],
          },
        },
      })
    }
  }

  const deletedEvents = []
  if (Object.keys(deleted).length) {
    for (const event of Object.keys(deleted.blocks)) {
      deletedEvents.push({
        type: 'deletedItem',
        data: {
          path: `blocks.${event}`,
        },
      })
    }
  }

  console.info('updated,', JSON.stringify(updated, null, 2))

  const updatedEvents = []
  if (Object.keys(updated).length) {
    for (const event of Object.keys(updated.blocks)) {
      updatedEvents.push({
        type: 'updatedItem',
        data: {
          path: `blocks.${event}`,
          value: {
            ...updated.blocks[event],
          },
        },
      })
    }
  }

  return [...addedEvents, ...updatedEvents, ...deletedEvents]
  // return [...addedSectionEvents, ...removedSectionEvents]
}
