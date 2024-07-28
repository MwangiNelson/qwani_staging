import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import category from './schemaTypes/category'
import post from './schemaTypes/post'
import author from './schemaTypes/author'
import event from './schemaTypes/event'
import writers from './schemaTypes/writers'
import team from './schemaTypes/team'
import publications from './schemaTypes/publications'
import seo from './schemaTypes/seo'
import homepage from './schemaTypes/homepage'
import aboutpage from './schemaTypes/aboutpage'
import writerspage from './schemaTypes/writerspage'
import publicationsPage from './schemaTypes/publicationsPage'
import contactPage from './schemaTypes/contactPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: 
  [post, author, category, blockContent,event,
    writers,team,publications,seo,homepage,
    aboutpage,writerspage,
  publicationsPage,
  contactPage
  ],
}
