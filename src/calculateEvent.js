export default function calculateEvent(originalDocument, editedDocument) {
  const editedDocumentBlockIds = editedDocument.blocks.map(
    (document) => document.id
  )

  const originalDocumentBlockIds = originalDocument?.blocks.map(
    (block) => block.id
  )

  const newSections = editedDocument?.blocks.filter(
    (block) => !originalDocumentBlockIds.includes(block.id)
  )

  const removedSections = originalDocument?.blocks.filter(
    (block) => !editedDocumentBlockIds.includes(block.id)
  )

  const updatedSections = editedDocument?.blocks.filter((block) => {
    if (!originalDocumentBlockIds.includes(block.id)) {
      return false
    }

    const originalBlock = originalDocument.blocks.find(
      (currentBlock) => currentBlock.id === block.id
    )

    return JSON.stringify(originalBlock) !== JSON.stringify(block)
  })

  const addedSectionEvents = newSections.map((section) => ({
    type: 'addedSection',
    data: {
      position: editedDocumentBlockIds.indexOf(section.id),
      path: `blocks.${section.id}`,
      value: section,
    },
  }))

  const removedSectionEvents = removedSections.map((section) => ({
    type: 'removedSection',
    data: {
      path: `blocks.${section.id}`,
    },
  }))

  const updatedSectionEvents = updatedSections.map((section) => ({
    type: 'updatedSection',
    data: {
      position: editedDocumentBlockIds.indexOf(section.id),
      path: `blocks.${section.id}`,
      value: section,
    },
  }))

  return [
    ...addedSectionEvents,
    ...updatedSectionEvents,
    ...removedSectionEvents,
  ]
}
