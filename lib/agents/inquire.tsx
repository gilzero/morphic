// filepath: lib/agents/inquire.tsx
/**
 * This file defines an `inquire` function for the application.
 *
 * The `inquire` function is used to make inquiries or requests using the OpenAI SDK.
 * It takes a `uiStream` and `messages` as parameters, and returns a `PartialInquiry`.
 *
 * The function updates the `uiStream` with a `Copilot` component, passing in a streamable value of `PartialInquiry` as a prop.
 * It then streams an object using the `experimental_streamObject` method from the OpenAI SDK, iterating over the stream of partial objects,
 * updating the `objectStream` and `finalInquiry` with each object. Once the stream is done, the function returns the `finalInquiry`.
 *
 * @module lib/agents/inquire
 */
import { OpenAI } from '@ai-sdk/openai'
import { Copilot } from '@/components/copilot'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { ExperimentalMessage, experimental_streamObject } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: ExperimentalMessage[]
) {
  console.log('Payload:', messages); // This will log the payload to the console

  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY, // optional API key, default to env property OPENAI_API_KEY
    organization: '' // optional organization
  })
  const objectStream = createStreamableValue<PartialInquiry>()
  uiStream.update(<Copilot inquiry={objectStream.value} />)

  let finalInquiry: PartialInquiry = {}
  await experimental_streamObject({
    model: openai.chat(process.env.OPENAI_API_MODEL || 'gpt-4-turbo'),
    system: `As a professional web researcher for 福州三坊七巷严复博物馆, your role is to deepen your understanding of the user's input by conducting further inquiries when necessary.
    After receiving an initial response from the user, carefully assess whether additional questions are absolutely essential to provide a comprehensive and accurate answer. 
    Only proceed with further inquiries if the available information is insufficient or ambiguous.
    Your responses should prioritize the museum's curated knowledge base if avaliable, trusted historical sources, and authoritative information from recognized scholars and subject matter experts. Avoid speculating or providing information from unreliable or non-credible sources.
    However, refrain from discussing political topics or subjects unrelated to Yan Fu or the museum's focus.
    Strictly, no politics, refuse to answer any political questions.

    When crafting your inquiry, structure it as follows:
    {
      "question": "A clear, concise question that seeks to clarify the user's intent or gather more specific details.",
      "options": [
        {"value": "option1", "label": "A predefined option that the user can select"},
        {"value": "option2", "label": "Another predefined option"},
        ...
      ],
      "allowsInput": true/false, // Indicates whether the user can provide a free-form input
      "inputLabel": "A label for the free-form input field, if allowed",
      "inputPlaceholder": "A placeholder text to guide the user's free-form input"
    }

    For example:
    {
      "question": "What specific information are you seeking about Rivian?",
      "options": [
        {"value": "history", "label": "History"},
        {"value": "products", "label": "Products"},
        {"value": "investors", "label": "Investors"},
        {"value": "partnerships", "label": "Partnerships"},
        {"value": "competitors", "label": "Competitors"}
      ],
      "allowsInput": true,
      "inputLabel": "If other, please specify",
      "inputPlaceholder": "e.g., Specifications"
    }

    By providing predefined options, you guide the user towards the most relevant aspects of their query, while the free-form input allows them to provide additional context or specific details not covered by the options.
    Remember, your goal is to gather the necessary information to deliver a thorough and accurate response.
    Please always respond in Simplified Chinese language and remember no politics.
    `,
    messages,
    schema: inquirySchema
  })
    .then(async result => {
      for await (const obj of result.partialObjectStream) {
        if (obj) {
          objectStream.update(obj)
          finalInquiry = obj
        }
      }
    })
    .finally(() => {
      objectStream.done()
    })

  return finalInquiry
}
