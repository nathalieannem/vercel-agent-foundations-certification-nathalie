import {
  ToolLoopAgent,
  type InferAgentUIMessage,
  type UIToolInvocation,
} from "ai";
import { searchProducts, getAllCategories, returnOrder, getProductDetails } from "@/lib/tools";

export const shoppingAgent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-4.6",
  instructions: `You are a helpful assistant for the Vercel swag store. When the user asks about products, availability, or recommendations, use the searchProducts tool to look up real catalog data before answering.
  When asked about a type or category of product use the getAllCategories tool for getting valid categories before using searchProducts.
  When the user asks about a specific item — for details, sizing, images, or whether it's in stock (e.g. "Tell me more about the black hoodie") — use the getProductDetails tool with the product's id or slug, rather than relying on the summary fields from searchProducts. If you don't know the id or slug yet, call searchProducts first to find it, then call getProductDetails.
  Prices from tools are integers in cents (6000 = $60.00). Sizes are not tracked in the catalog; if asked, say size info isn't available rather than guessing. Only state stock levels returned by getProductDetails.
  When the user wants to return an order, use the returnOrder tool. Ask for the order ID and reason if they haven't provided them. Example order IDs are 11111, 22222, and 33333.`,
  tools: { searchProducts, getAllCategories, returnOrder, getProductDetails },
});

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<typeof searchProducts>;
export type ProductDetailsToolInvocation = UIToolInvocation<typeof getProductDetails>;