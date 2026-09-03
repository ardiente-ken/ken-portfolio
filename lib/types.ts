export type SocialLink = {
  label: string;
  url: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatar: string;
  resumeUrl: string;
  socials: SocialLink[];
};

export type TechStackItem = {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100, used for the "signal strength" bar
};

export type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[]; // ids referencing TechStackItem
  liveUrl: string;
  githubUrl: string;
  images: string[]; // paths under /uploads or full URLs
  order: number;
};

export type Database = {
  profile: Profile;
  techStacks: TechStackItem[];
  projects: Project[];
};
