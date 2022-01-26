import * as contentstack from "contentstack";
import * as Utils from "@contentstack/utils";

export const Stack = contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION ? process.env.CONTENTSTACK_REGION : "us",
});
