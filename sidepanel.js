import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
  
console.log("sidepanel.js is loaded!");

export const run = async (input) => {

    const chat = new ChatOpenAI({
        openAIApiKey: "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",
        });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
        "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: chat,
    });

    const response = await chain.call({
        input: input,
    });

    console.log(input)
    console.log(chain)
    console.log(response)

    return response
}

export const handleButtonClick = async () => {
    console.log("Sent input message")

    const input = document.getElementById('userInput').value;
    const response = await run(input);
    document.getElementById('output').innerText = response; 
}

// Add event listener for the button
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', handleButtonClick);
});