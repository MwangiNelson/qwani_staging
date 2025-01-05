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
export interface ISlugSanity {
  _type: string;
  current: string;
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
  author: IAuthor;
  mainImage: ISanityAsset;
  categories?: [IPostCategory];
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
  county: ILocation;
}

export interface ITeamMember extends ISanityFetched {
  name: string;
  role: string;
  slug: ISlugSanity;
  image: ISanityAsset;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  description: any;
}
export interface IWriter extends ISanityFetched {
  name: string;
  slug: ISlugSanity;
  image: ISanityAsset;
  specializations: string[];
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  description: any;
}
export interface IPublication extends ISanityFetched {
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  author: string;
  publishDate: string;
  description: string;
  coverImage: ISanityAsset;
  price: number;
  buyLink: string;
  genre: string[];
  content: any[];
  featuredWriters: IWriter[];
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
  exploreMoreImage: ISanityAsset;
  valuesTitle: string;
  valuesDescription: string;
  values: {
    title: string;
    description: string;
  }[];
  teamTitle: string;
  teamMembers: ITeamMember[];
}

export interface IWritersPage extends ISanityFetched {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: ISanityAsset;
  ctaText: string;
  ctaButtonLink: string;
  writersTitle: string;
  writers: IWriter[];
}

export interface IPublicationsPage extends ISanityFetched {
  heroTitle: string;
  heroSubtitle: string;
  ctaButton: string;
  fileUrl: string;
  heroImage: ISanityAsset;
  publicationsTitle: string;
  publications: IPublication[];
  publishWithUsTitle: string;
  publishWithUsSubtitle: string;
}
export interface IContactPage extends ISanityFetched {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: ISanityAsset;
  contactInformation: {
    heading: string;
    items: {
      label: string;
      link?: string;
    }[];
  }[];
}

export type TPages =
  | "home"
  | "about"
  | "writers"
  | "publications"
  | "contact"
  | "blogs"
  | "events"
  | "gallery";

export interface IBlogsPage extends ISanityFetched {
  heroTitle: string;
  heroBlog: IPost;
  heroBlogs: IPost[];
  trendingTitle: string;
  trendingBlogs: IPost[];
}

export interface IGalleryPage extends ISanityFetched {
  title: string;
  description: string;
}

export interface IGallery extends ISanityFetched {
  title: string;
  description: string;
  featuredImage: ISanityAsset;
  galleryImages: ISanityAsset[];
  date: string;
}

export interface IAuthor extends ISanityFetched {
  name: string;
  slug: ISlugSanity;
  image: ISanityAsset;
  bio: string;
}

export interface IContributersPage extends ISanityFetched {
  title: string;
  description: string;
  btnText?: string;
  post?: IPost;
}

export interface ILocation extends ISanityFetched {
  title: string;
  slug: ISlugSanity;
}
