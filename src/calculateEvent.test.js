import calculateEvent from './calculateEvent'

test('identifies a section was added', () => {
  // Arrange
  const originalDocument = { extraBlocks: [], blocks: [] }
  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {
          content:
            '{"blocks":[{"key":"69cfv","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'addedSection',
      data: {
        path: 'blocks.1625778947895',
        position: 0,
        value: {
          id: 1625778947895,
          name: 'RichText',
          props: {
            content:
              '{"blocks":[{"key":"69cfv","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          },
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test('identifies two sections were added', () => {
  // Arrange
  const originalDocument = { extraBlocks: [], blocks: [] }
  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {
          content:
            '{"blocks":[{"key":"69cfv","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      },
      {
        id: 4789516257789,
        name: 'Text',
        props: {
          text: 'Lorem Ipsum dolor sit amet',
        },
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'addedSection',
      data: {
        path: 'blocks.1625778947895',
        position: 0,
        value: {
          id: 1625778947895,
          name: 'RichText',
          props: {
            content:
              '{"blocks":[{"key":"69cfv","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          },
        },
      },
    },
    {
      type: 'addedSection',
      data: {
        path: 'blocks.4789516257789',
        position: 1,
        value: {
          id: 4789516257789,
          name: 'Text',
          props: {
            text: 'Lorem Ipsum dolor sit amet',
          },
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test('identifies a section was removed', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 98,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'removedSection',
      data: {
        path: 'blocks.98',
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test('identifies a section was added in the position N', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 95,
        name: 'RichText',
        props: {},
      },
      {
        id: 96,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 95,
        name: 'RichText',
        props: {},
      },
      {
        id: 96,
        name: 'RichText',
        props: {},
      },
      {
        id: 99,
        name: 'NewSection',
        props: {},
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'addedSection',
      data: {
        position: 2,
        path: 'blocks.99',
        value: {
          id: 99,
          name: 'NewSection',
          props: {},
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test('identifies changed sections', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 95,
        name: 'RichText',
        props: { id: 'a1', foo: 1 },
      },
      {
        id: 96,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 95,
        name: 'RichText',
        props: { id: 'a1', foo: 2 },
      },
      {
        id: 96,
        name: 'RichText',
        props: { id: 'b2', bar: 2 },
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'updatedSection',
      data: {
        path: 'blocks.95',
        position: 0,
        value: {
          id: 95,
          name: 'RichText',
          props: { id: 'a1', foo: 2 },
        },
      },
    },
    {
      type: 'updatedSection',
      data: {
        position: 1,
        path: 'blocks.96',
        value: {
          id: 96,
          name: 'RichText',
          props: { id: 'b2', bar: 2 },
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})
