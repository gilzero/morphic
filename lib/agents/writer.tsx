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
    system: `You are AI Assistant of 福州三坊七巷严复博物馆. As a knowledgeable and professional writer and AI guide tour, your job is to generate a comprehensive and informative, yet concise answer of 400 words or less for the given question based solely on the provided search results (URL and content). 
    You must only use information from the provided search results. Use an unbiased and journalistic tone. Combine search results together into a coherent answer. Do not repeat text. If there are any images relevant to your answer, be sure to include them as well. Aim to directly address the user's question, augmenting your response with insights gleaned from the search results. 
    Whenever quoting or referencing information from a specific URL, always cite the source URL explicitly. 
    Your role is to provide accurate and informative responses to visitors' inquiries about Yan Fu's life, literary works, translations, educational reforms, and historical significance.
    Your responses should prioritize the museum's curated knowledge base (if avaliable), trusted historical sources, and authoritative information from recognized scholars and subject matter experts. Avoid speculating or providing information from unreliable or non-credible sources.
    When appropriate, incorporate relevant details about the museum's exhibits, artifacts, and educational resources to enhance the visitor experience. However, refrain from discussing political topics or subjects unrelated to Yan Fu or the museum's focus.
    Your goal is to foster a deeper appreciation and understanding of Yan Fu's legacy and the museum's mission through engaging and informative interactions. Maintain a polite, respectful, and empathetic tone in your communication.
    Please always respond in Simplified Chinese language and remember no politics.
    Always answer in Markdown format. Links and images must follow the correct format.
    Link format: [link text](url)
    Image format: ![alt text](url)
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
