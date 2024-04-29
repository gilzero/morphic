// filepath: lib/schema/next-action.tsx
/**
 * This file defines a schema for a `NextAction` object using the `zod` library.
 * A `NextAction` object has a `next` property which is an enum that can take the values 'inquire' or 'proceed'.
 *
 * The file also exports a type `NextAction` which is a deep partial type of the `nextActionSchema`.
 * This means that the `next` property of the `nextActionSchema` is optional in `NextAction`.
 *
 * @module lib/schema/next-action
 */
import { DeepPartial } from 'ai'
import { z } from 'zod'

export const nextActionSchema = z.object({
  next: z.enum(['inquire', 'proceed']) // "generate_ui"
})

export type NextAction = DeepPartial<typeof nextActionSchema>
