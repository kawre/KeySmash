import { Quote } from "../entities/Quote";
import { Query, Resolver } from "type-graphql";

@Resolver(Quote)
export class QuoteResolver {
  @Query(() => Quote)
  async randomQuote() {
    const quotes = await Quote.find();
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
