export default function calculateEvent(originalDocument, editedDocument) {
  const editedDocumentBlockIds = editedDocument.blocks.map(
    (document) => document.id
  )

  const originalDocumentBlockIds = originalDocument.blocks.map(
    (block) => block.id
  )

  const newSections = editedDocument.blocks.filter(
    (block) => !originalDocumentBlockIds.includes(block.id)
  )

  const removedSections = originalDocument.blocks.filter(
    (block) => !editedDocumentBlockIds.includes(block.id)
  )

  // const commonSections = originalDocument.blocks.filter((block) =>
  //   editedDocumentBlockIds.includes(block.id)
  // );

  const addedSectionEvents = newSections.map((section) => ({
    type: 'addedSection',
    data: {
      position: editedDocumentBlockIds.indexOf(section.id),
      section,
    },
  }))

  const removedSectionEvents = removedSections.map((section) => ({
    type: 'removedSection',
    data: {
      section,
    },
  }))

  return [...addedSectionEvents, ...removedSectionEvents]
}
