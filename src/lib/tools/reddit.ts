import axios from 'axios';

export async function getRedditPost(subreddit: string): Promise<{ title: string; content: string; url: string }> {
  try {
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=25&t=week`);
    const posts = response.data?.data?.children || [];

    if (posts.length === 0) {
      throw new Error('No posts found');
    }

    // Get a random post from the top posts
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    const post = randomPost.data;

    return {
      title: post.title,
      content: post.selftext || post.url,
      url: post.url,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Reddit post: ${error}`);
  }
}

export async function getRedditJoke(): Promise<{ setup: string; punchline: string }> {
  try {
    const response = await axios.get('https://www.reddit.com/r/ProgrammerHumor/top.json?limit=100&t=week');
    const posts = response.data?.data?.children || [];

    // Filter for text posts that look like jokes
    const jokes = posts.filter((p: any) => {
      const post = p.data;
      return post.selftext && post.selftext.length > 0 && post.selftext.length < 500;
    });

    if (jokes.length === 0) {
      // Fallback to title-based jokes
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      return {
        setup: randomPost.data.title,
        punchline: randomPost.data.selftext || 'Check the image!',
      };
    }

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      setup: randomJoke.data.title,
      punchline: randomJoke.data.selftext,
    };
  } catch (error) {
    // Fallback joke
    return {
      setup: 'Why do programmers prefer dark mode?',
      punchline: 'Because light attracts bugs!',
    };
  }
}
