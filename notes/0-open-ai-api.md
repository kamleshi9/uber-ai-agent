## 0. OpenAI API

`.env`

```jsx
VITE_OPENAI_API_KEY='[your api key]'
```

`openai.ts`
```ts
import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_OPENAI_API_KEY is not set in environment variables');
}

export const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // Only for learning purposes
});
```

`index.ts`
```ts
import { openai } from './openai';

const completion = await openai.responses.create({
  model: 'gpt-5-mini',
  input: userMessage,
});

console.log(response.output_text);
```