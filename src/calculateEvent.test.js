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
      type: 'addedItem',
      data: {
        path: 'blocks.1625778947895',
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

test('identifies two sections was added', () => {
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
      type: 'addedItem',
      data: {
        path: 'blocks.1625778947895',
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
      type: 'addedItem',
      data: {
        path: 'blocks.4789516257789',
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
        id: 1625778947895,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947897,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947898,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947897,
        name: 'RichText',
        props: {},
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'deletedItem',
      data: {
        path: 'blocks.1625778947898',
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test.skip('identifies a section was added in the position N', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: {},
      },
      {
        id: 1625778947899,
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
      type: 'addedItem',
      data: {
        position: 2,
        path: 'blocks.1625778947899',
        value: {
          id: 1625778947899,
          name: 'NewSection',
          props: {},
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test.only('identifies changed sections', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: { id: 'a1', foo: 1 },
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: {},
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: {
          id: 'a1',
          foo: 2,
        },
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: { id: 'b1', bar: 1 },
      },
    ],
  }

  // Act
  const events = calculateEvent(originalDocument, editedDocument)

  // Assert
  const expectedEvents = [
    {
      type: 'addedItem',
      data: {
        position: 1,
        path: 'blocks.1625778947896',
        value: {
          props: { id: 'b1', bar: 1 },
        },
      },
    },
    {
      type: 'updatedItem',
      data: {
        path: 'blocks.1625778947895.props',
        value: {
          a1: { foo: 2 },
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test.skip('identifies add/removed/changed item in an array', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947897,
        name: 'Carrousel',
        props: {
          allItems: [
            {
              sources: [],
            },
          ],
        },
      },
    ],
  }

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 123,
        name: 'Carrousel',
        props: {
          allItems: [
            {
              id: 'abc',
              sources: [
                {
                  id: 456,
                  srcSet: 'https://...',
                },
              ],
            },
          ],
        },
      },
    ],
  }

  // Act
  const expectedEvents = [
    {
      type: 'addedItem',
      data: {
        path: 'blocks.123.allItems.abc.sources',
        position: 0,
        item: {
          id: 456,
          srcSet: 'https://...',
        },
      },
    },
  ]
  // Assert
})

test.todo('identifies add/removed/changed item in N nested array')
