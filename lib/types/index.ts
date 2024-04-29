// filepath: lib/types/index.ts
/**
 * This file exports two TypeScript types: `SearchResults` and `SearchResultItem`.
 *
 * The `SearchResults` type represents the structure of the search results. It has three properties:
 * - `images`: An array of strings, each representing an image URL.
 * - `results`: An array of `SearchResultItem` objects.
 * - `query`: A string that represents the search query.
 *
 * The `SearchResultItem` type represents the structure of an individual search result. It has three properties:
 * - `title`: A string that represents the title of the search result.
 * - `url`: A string that represents the URL of the search result.
 * - `content`: A string that represents the content of the search result.
 *
 * @module lib/types/index
 */
export type SearchResults = {
  images: string[]
  results: SearchResultItem[]
  query: string
}

export type SearchResultItem = {
  title: string
  url: string
  content: string
}
