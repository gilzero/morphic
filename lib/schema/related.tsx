// filepath: lib/schema/related.tsx
/**
 * This file defines a schema for a `Related` object using the `zod` library.
 * A `Related` object has an `items` property which is an array of objects, each containing a `query` string.
 * The length of the `items` array is restricted to 3.
 *
 * The file also exports a type `PartialRelated` which is a deep partial type of the `relatedSchema`.
 * This means that the `items` property of the `relatedSchema` is optional in `PartialRelated`.
 *
 * @module lib/schema/related
 */
import { DeepPartial } from 'ai'
import { z } from 'zod'

export const relatedSchema = z.object({
  items: z
    .array(
      z.object({
        query: z.string()
      })
    )
    .length(3)
})
export type PartialRelated = DeepPartial<typeof relatedSchema>
