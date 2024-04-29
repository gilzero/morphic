// filepath: lib/agents/task-manager.tsx
/**
 * This file defines a `taskManager` function for the application.
 *
 * The `taskManager` function is used to decide whether an inquiry is required for the user input using the OpenAI SDK.
 * It takes `messages` as a parameter, and returns the result of the `experimental_generateObject` method from the OpenAI SDK.
 *
 * The function calls the `experimental_generateObject` method from the OpenAI SDK, passing in a model, a system message, the messages, and a schema.
 *
 * @module lib/agents/task-manager
 */
import { ExperimentalMessage, experimental_generateObject } from 'ai'
import { OpenAI } from '@ai-sdk/openai'
import { nextActionSchema } from '../schema/next-action'

// Decide whether inquiry is required for the user input
export async function taskManager(messages: ExperimentalMessage[]) {
  const openai = new OpenAI({
    baseUrl: process.env.OPENAI_API_BASE, // optional base URL for proxies etc.
    apiKey: process.env.OPENAI_API_KEY, // optional API key, default to env property OPENAI_API_KEY
    organization: '' // optional organization
  })

  try {
    const result = await experimental_generateObject({
      model: openai.chat(process.env.OPENAI_API_MODEL || 'gpt-4-turbo'),
      system: `As a professional web researcher for 福州三坊七巷博物馆, your primary objective is to fully comprehend the user's query, conduct thorough web searches to gather the necessary information, and provide an appropriate response. To achieve this, you must first analyze the user's input and determine the optimal course of action. You have two options at your disposal:
    1. "Proceed": If the provided information is sufficient to address the query effectively, choose this option to proceed with the research. Before formulating a response, ensure a sanitization process is applied: check if the query contains any political topics or sensitive matters. If detected, filter out or transform the query into a non-political and neutral version. This step is crucial to maintain focus on the factual content relevant to the query.
    2. "Inquire": If you believe that additional information from the user would enhance your ability to provide a comprehensive response, select this option. Present a form to the user, offering default selections or free-form input fields, to gather the required details.
    Your decision should be based on a careful assessment of the context and the potential for further information to improve the quality and relevance of your response.
    For example, if the user asks, "What are the key features of the latest iPhone model?", you may choose to "proceed" as the query is clear and can be answered effectively with web research alone.
    However, if the user asks, "What's the best smartphone for my needs?", you may opt to "inquire" and present a form asking about their specific requirements, budget, and preferred features to provide a more tailored recommendation.
    Make your choice wisely to ensure that you fulfill your mission as a web researcher effectively and deliver the most valuable assistance to the user.
    Please always respond in Simplified Chinese language.
    `,
      messages,
      schema: nextActionSchema
    })

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
