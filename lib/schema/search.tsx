// filepath: lib/schema/search.tsx
/**
 * This file defines a schema for a `Search` object using the `zod` library.
 * A `Search` object has the following properties:
 * - `query`: A string that describes the search query.
 * - `max_results`: A number that indicates the maximum number of results to return. It has a maximum value of 20 and defaults to 5.
 * - `search_depth`: An enum that can take the values 'basic' or 'advanced'. It defaults to 'basic'.
 *
 * The file also exports a type `PartialInquiry` which is a deep partial type of the `searchSchema`.
 * This means that all properties of the `searchSchema` are optional in `PartialInquiry`.
 *
 * @module lib/schema/search
 */
import { DeepPartial } from 'ai'
import { z } from 'zod'

export const searchSchema = z.object({
  query: z.string().describe('The query to search for'),
  max_results: z
    .number()
    .max(20)
    .default(5)
    .describe('The maximum number of results to return'),
  search_depth: z
    .enum(['basic', 'advanced'])
    .default('basic')
    .describe('The depth of the search')
})

export type PartialInquiry = DeepPartial<typeof searchSchema>
