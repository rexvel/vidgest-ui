# Video summarizer

The name tells you what this project supposed to do.

That my implementation of idea of synthesizing the video content by the help of LLMs.

All you need is ```API_KEY``` of LLM that you would like to utilize.
Currently there are only OpenAI and Anthropic LLMs supported.

I recommend you to use OpenAI as it is cheaper and more efficient with text processing so far.


## How to run it ?

Make sure that BE is working and all required credentials are set.
### Install dependencies

You can use any package manager as you like but out of the box this project is using [pnpm](https://pnpm.io/).

```bash
pnpm install
```
### Run the app
```bash
pnpm run dev
```
### Build the app
```bash
pnpm run build
```
### Run the app in production mode
```bash