interface Subtopic {
    name: string;
    description: string;
  }
  
  interface Topic {
    name: string;
    subtopics: Subtopic[];
  }
  
export interface MindTreeData {
    topics: Topic[];
}