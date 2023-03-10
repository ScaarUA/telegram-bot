import { Configuration, OpenAIApi } from "openai";
import config from "../config.js";

const configuration = new Configuration({
    organization: "org-uJNd9aQi2F6NMleq1bYslJCL",
    apiKey: config.openaiApiKey,
});

const openai = new OpenAIApi(configuration);

export default openai;