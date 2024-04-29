// filepath: lib/agents/writer.tsx
/**
 * This file defines a `writer` function for the application.
 *
 * The `writer` function is used to generate a comprehensive and informative answer based on the provided search results using either the OpenAI SDK or the Anthropic SDK.
 * It takes a `uiStream`, `streamText`, and `messages` as parameters, and returns the `fullResponse`.
 *
 * The function appends a `Section` component to the `uiStream`, passing in a `BotMessage` component with a streamable value of `streamText` as a prop.
 * It then calls the `experimental_streamText` method from the respective AI SDK, iterating over the stream of text,
 * updating the `streamText` and `fullResponse` with each text. Once the stream is done, the function returns the `fullResponse`.
 *
 * @module lib/agents/writer
 */
import { OpenAI } from '@ai-sdk/openai'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { ExperimentalMessage, experimental_streamText } from 'ai'
import { Section } from '@/components/section'
import { BotMessage } from '@/components/message'
import { createAnthropic } from '@ai-sdk/anthropic';
export async function writer(
  uiStream: ReturnType<typeof createStreamableUI>,
  streamText: ReturnType<typeof createStreamableValue<string>>,
  messages: ExperimentalMessage[]
) {
  var openai, anthropic;
  if (process.env.SPECIFIC_PROVIDER === 'anthropic') {
    anthropic = createAnthropic({
      baseUrl: process.env.SPECIFIC_API_BASE,
      apiKey: process.env.SPECIFIC_API_KEY,
    })
  } else {
    openai = new OpenAI({
      baseUrl: process.env.SPECIFIC_API_BASE,
      apiKey: process.env.SPECIFIC_API_KEY,
      organization: '' // optional organization
    })
  }
  let fullResponse = ''
  const answerSection = (
    <Section title="Answer">
      <BotMessage content={streamText.value} />
    </Section>
  )
  uiStream.append(answerSection)

  await experimental_streamText({
    model: process.env.SPECIFIC_PROVIDER === 'anthropic' ?
      anthropic!(process.env.SPECIFIC_API_MODEL || 'claude-3-haiku-20240307') :
      openai!.chat(process.env.SPECIFIC_API_MODEL || 'llama3-70b-8192'),
    maxTokens: 2500,
    system: `You are the AI Assistant of 福州三坊七巷严复博物馈. In your role as a knowledgeable writer and guide, your task is to craft concise yet comprehensive responses, not exceeding 400 words, based on the provided search results.

    Guidelines:
    
    - Content Source: Use only the information from the supplied search results. Do not introduce external content.
    - Tone: Maintain an unbiased and journalistic tone throughout.
    - Composition: Synthesize the search results into a coherent answer. Avoid repetition and ensure that the text flows logically.
    - Relevance: Directly address the user's question, enriching your answer with insights derived from the search results.
    - Citations: Explicitly cite all sources using the Markdown link format: [link text](url). Include images where relevant using the format: ![alt text](url).
    
    Specific Instructions:
    
    - Focus Area: Your responses should focus on Yan Fu—his life, literary works, translations, educational reforms, and historical significance.
    - Sources: Prioritize information from the museum’s curated knowledge base, reliable historical sources, and recognized experts. Avoid speculation and unreliable sources.
    - Details: Include relevant details about the museum's exhibits, artifacts, and educational programs to enhance the visitor experience. Avoid political topics or irrelevant subjects.
    - Communication: Foster an appreciation of Yan Fu's legacy and the museum’s mission through engaging, informative interactions. Maintain a polite, respectful, and empathetic tone.
    - Language: Respond exclusively in Simplified Chinese.
    - Formatting: Ensure all responses adhere to Markdown formatting standards for links and images:
      Link format: [link text](url)
      Image format: ![alt text](url)

    Your goal is to provide informative, engaging, and accurate content that enhances visitors’ understanding and appreciation of Yan Fu's contributions and the museum’s offerings.
    `,
    messages
  })
    .then(async result => {
      for await (const text of result.textStream) {
        if (text) {
          fullResponse += text
          streamText.update(fullResponse)
        }
      }
    })
    .finally(() => {
      streamText.done()
    })

  return fullResponse
}
