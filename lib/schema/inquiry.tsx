// filepath: lib/schema/inquiry.tsx
/**
 * This file defines a schema for an inquiry object using the `zod` library.
 * An inquiry object has the following properties:
 * - `question`: A string that describes the inquiry question.
 * - `options`: An array of objects, each containing a `value` and a `label` string.
 * - `allowsInput`: A boolean that indicates whether the inquiry allows for input.
 * - `inputLabel`: An optional string that provides a label for the input field.
 * - `inputPlaceholder`: An optional string that serves as a placeholder for the input field.
 *
 * The file also exports a type `PartialInquiry` which is a deep partial type of the `inquirySchema`.
 * This means that all properties of the `inquirySchema` are optional in `PartialInquiry`.
 *
 * @module lib/schema/inquiry
 */

import { DeepPartial } from 'ai'
import { z } from 'zod'

export const inquirySchema = z.object({
  question: z.string().describe('The inquiry question'),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .describe('The inquiry options'),
  allowsInput: z.boolean().describe('Whether the inquiry allows for input'),
  inputLabel: z.string().optional().describe('The label for the input field'),
  inputPlaceholder: z
    .string()
    .optional()
    .describe('The placeholder for the input field')
})

export type PartialInquiry = DeepPartial<typeof inquirySchema>
