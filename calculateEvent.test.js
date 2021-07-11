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
        position: 0,
        section: {
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

test('identifies a section was added in the position N', () => {
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
      {
        id: 1625778947898,
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
      type: 'addedSection',
      data: {
        position: 4,
        section: {
          id: 1625778947899,
          name: 'NewSection',
          props: {},
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
      type: 'removedSection',
      data: {
        section: {
          id: 1625778947898,
          name: 'RichText',
          props: {},
        },
      },
    },
  ]

  expect(events).toEqual(expectedEvents)
})

test.skip('identifies changed sections', () => {
  // Arrange
  const originalDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: { foo: 1 },
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

  const editedDocument = {
    extraBlocks: [],
    blocks: [
      {
        id: 1625778947895,
        name: 'RichText',
        props: { foo: 2 },
      },
      {
        id: 1625778947896,
        name: 'RichText',
        props: { bar: 1 },
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
      type: 'changedSection',
      data: {
        section: {
          id: 1625778947895,
          name: 'RichText',
          props: { foo: 2 },
        },
      },
    },
    {
      type: 'changedSection',
      data: {
        id: 1625778947896,
        name: 'RichText',
        props: { bar: 1 },
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
test.skip('identifies add/removed/changed item in an array', () => {
  // Arrange
  const originalDocument = {
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
                  id: 987,
                  srcSet: 'image1.png',
                },
                {
                  id: 456,
                  srcSet: 'image2.png',
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
          id: 987,
          srcSet: 'image1.png',
        },
      },
    },
    {
      type: 'changedItem',
      data: {
        path: 'blocks.123.allItems.abc.sources.456',
        position: 1,
        item: {
          id: 456,
          srcSet: 'image2.png',
        },
      },
    },
  ]
  // Assert
})

test.todo('identifies add/removed/changed item in N nested array')
