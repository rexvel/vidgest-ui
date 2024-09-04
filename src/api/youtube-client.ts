interface VideoInfo {
    title: string;
    duration: string;
    thumbnailUrl: string;
    datePosted: string;
    videoUrl: string;
    authorName: string;
  }
  
export class YouTubeApiClient {
    private readonly baseUrl: string;
    private readonly apiKey: string;
  
    constructor(apiKey: string) {
      this.baseUrl = 'https://www.googleapis.com/youtube/v3/';
      this.apiKey = apiKey;
    }
  
    private async fetchData<T>(endpoint: string, params: Record<string, string>): Promise<T> {
      const url = new URL(endpoint, this.baseUrl);
      url.searchParams.append('key', this.apiKey);
      
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
      }
  
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json() as T;
    }
  
    async getVideoInfo(videoId: string): Promise<VideoInfo> {
      const data = await this.fetchData<any>('videos', {
        part: 'snippet,contentDetails',
        id: videoId
      });
  
      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const snippet = video.snippet;
        const contentDetails = video.contentDetails;
  
        return {
          title: snippet.title,
          duration: contentDetails.duration,
          thumbnailUrl: snippet.thumbnails.high.url,
          datePosted: new Date(snippet.publishedAt).toLocaleDateString(),
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          authorName: snippet.channelTitle
        };
      } else {
        throw new Error('Video not found');
      }
    }
  }
