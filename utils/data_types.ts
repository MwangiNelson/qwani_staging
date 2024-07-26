export interface ISanityFetched {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}
export interface ISanityAsset {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface ISeo extends ISanityFetched {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: ISanityAsset;
  ogTitle: string;
  ogDescription: string;
  twitterCardType: string;
}
export interface IPostCategory extends ISanityFetched {
  title: string;
  description: string;
}

export interface IPost extends ISanityFetched {
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  author: {
    name: string;
    image: ISanityAsset;
  };
  mainImage: ISanityAsset;
  categories: {
    title: string;
  };
  publishedAt: string;
  excerpt: string;
  body: any;
}
export interface IEvent extends ISanityFetched {
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  featuredImage: ISanityAsset;
  date: string;
  paymentLink?: string;
  time: string;
  price: number;
  location?: string;
  googleMapsLink?: string;
  excerpt: string;
  description: any;
  gallery: ISanityAsset[];
}

export interface ITeamMember extends ISanityFetched {
  name: string;
  role: string;
  image: ISanityAsset;
  socialLinks: {
    twitter: string;
    instagram: string;
    tiktok: string;
  };
  description: any;
}
export interface IHomePage extends ISanityFetched {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroImage: ISanityAsset;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: ISanityAsset;
  about2Title: string;
  about2description: string;
  highlights: {
    title: string;
    description: string;
    image: ISanityAsset;
  }[];
  eventsTitle: string;
  eventsDescription: string;
  events: IEvent[]; // Replace IEvent with the actual type of your event documents
  graySectionTitle: string;
  blogsTitle: string;
  blogs: IPost[]; // Replace IPost with the actual type of your post documents
}
export interface IAboutPage extends ISanityFetched {
  heroTitle: string;
  heroImage: ISanityAsset;
  aboutTitle: string;
  aboutDescription: string;
  statistics: {
    label: string;
    number: number;
  }[];
  valuesTitle: string;
  valuesDescription: string;
  values: {
    title: string;
    description: string;
  }[];
  teamTitle: string;
  teamMembers: ITeamMember[];
}
