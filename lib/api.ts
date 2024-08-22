import { client, sanityFetch } from "@/sanity/lib/client";
import {
  IAboutPage,
  IAuthor,
  IBlogsPage,
  IContactPage,
  IEvent,
  IGallery,
  IGalleryPage,
  IHomePage,
  IPost,
  IPostCategory,
  IPublication,
  IPublicationsPage,
  ISeo,
  ITeamMember,
  IWriter,
  IWritersPage,
} from "@/utils/data_types";
import next from "next";
const normal = 24 * 60 * 60 * 1000;

export const fetchSeo = async (page: string): Promise<ISeo> => {
  const query = `*[_type == "seo" && page == "${page}"][0]`;
  const data = await sanityFetch<ISeo>({
    query,
    tags: ["seo"],
  });
  return data;
};
export const fetchBlogs = async () => {
  const query = `*[_type == "post"]{
   ...,
    author->{...},
    categories[]->{...},
   
  }`;
  const data = await sanityFetch<IPost[]>({
    query,
    tags: ["post"],
  });

  return data;
};

export const getHomePageContent = async (): Promise<IHomePage> => {
  const query = `*[_type == "home"][0]{
    ...,
    events[]->{...},
    blogs[]->{...},
    
  }`;
  const data = await sanityFetch<IHomePage>({
    query,
    tags: ["home"],
  });
  return data;
};

//about page
export const fetchAboutPageContent = async (): Promise<IAboutPage> => {
  const query = `*[_type == "about"][0]{
    ...,
     teamMembers[]->{...},
  }`;
  const data = await sanityFetch<IAboutPage>({
    query,
    tags: ["about"],
  });
  return data;
};

export const fetchEvents = async (): Promise<IEvent[]> => {
  const query = `*[_type == "event"]{
    ...
  }`;
  const data = await sanityFetch<IEvent[]>({
    query,
    tags: ["event"],
  });

  return data;
};

//upcoming events
export const fetchUpcomingEvents = async (): Promise<IEvent[]> => {
  const query = `*[_type == "event" && date > now()]{
    ...
  }`;
  const data = await sanityFetch<IEvent[]>({
    query,
    tags: ["event"],
  });
  return data;
};
//get event by id
export const fetchEventById = async (id: string): Promise<IEvent> => {
  const query = `*[_type == "event" && _id == "${id}"][0]{
    ...
  }`;
  const data = await sanityFetch<IEvent>({
    query,
    tags: ["event"],
  });
  return data;
};

//get writers
export const fetchWriters = async () => {
  const query = `*[_type == "writer"]{
    ...
  }`;
  try {
    const data = await sanityFetch<IWriter[]>({
      query,
      tags: ["writer"],
    });

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

//get writer by id
export const fetchWriterById = async (id: string): Promise<IWriter> => {
  const query = `*[_type == "writer" && _id == "${id}"][0]{
    ...
  }`;
  const data = await sanityFetch<IWriter>({
    query,
    tags: ["writer"],
  });
  return data;
};

//get writer by slug
export const fetchWriterBySlug = async (slug: string): Promise<IWriter> => {
  const query = `*[_type == "writer" && slug.current == "${slug}"][0]{
    ...
  }`;
  const data = await sanityFetch<IWriter>({
    query,
    tags: ["writer"],
  });
  return data;
};

//get  writers page
export const fetchWritersPage = async () => {
  const query = `*[_type == "writersPage"][0]{
    ...,
    writers[]->{...},
  }`;
  const data = await sanityFetch<IWritersPage>({
    query,
    tags: ["writersPage"],
  });
  return data;
};

//get blog by id

export const fetchBlogById = async (id: string) => {
  const query = `*[_type == "post" && _id == "${id}"][0]{
    ...,
    author->{name, image},
    categories[]->{...},
  }`;
  const data = await sanityFetch<IPost>({
    query,
    tags: ["post"],
  });

  return data;
};

//fetch by slug
export const fetchBlogBySlug = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]{
    ...,
    author->{name, image},
    categories[]->{...},
  }`;
  const data = await sanityFetch<IPost>({
    query,
    tags: ["post"],
  });

  return data;
};

export const fetchPublicationPage = async () => {
  const query = `*[_type == "publicationsPage"][0]{
    ...,
    publications[]->{...},
    "fileUrl": file.asset->url,
  }`;
  const data = await sanityFetch<IPublicationsPage>({
    query,
    tags: ["publicationsPage"],
  });

  return data;
};

//
export const fetchPublicationById = async (id: string) => {
  const query = `*[_type == "publication" && _id == "${id}"][0]{
    ...,
    author->{name, image},
  }`;
  const data = await sanityFetch<IPublication>({
    query,
    tags: ["publication"],
  });

  return data;
};

// by slug
export const fetchPublicationBySlug = async (slug: string) => {
  const query = `*[_type == "publication" && slug.current == "${slug}"][0]{
    ...,
    author->{name, image},
  }`;
  const data = await sanityFetch<IPublication>({
    query,
    tags: ["publication"],
  });

  return data;
};
export const fetchContactPage = async () => {
  const query = `*[_type == "contactPage"][0]{
    ...
  }`;
  const data = await sanityFetch<IContactPage>({
    query,
    tags: ["contactPage"],
  });

  return data;
};

//get team member by id
export const fetchTeamMemberById = async (id: string) => {
  const query = `*[_type == "team" && _id == "${id}"][0]{
    ...
  }`;
  const data = await sanityFetch<ITeamMember>({
    query,
    tags: ["team"],
  });

  return data;
};

//fetch team member by slug
export const fetchTeamMemberBySlug = async (slug: string) => {
  const query = `*[_type == "team" && slug.current == "${slug}"][0]{
    ...
  }`;
  const data = await sanityFetch<ITeamMember>({
    query,
    tags: ["team"],
  });

  return data;
};

//get blogsPage
export const fetchBlogsPageContent = async () => {
  const query = `*[_type == "blogPage"][0]{
    ...,
    heroBlog->{
      ...,
      author->{name, image},
      categories[]->{...},
    },
    heroBlogs[]->{
      ...,
      author->{...},
      categories[]->{...},
    },
    trendingBlogs[]->{
      ...,
      author->{
        ...,
      },
      categories[]->{...},
    },
  }`;
  const data = await sanityFetch<IBlogsPage>({
    query,
    tags: ["blogPage"],
  });

  return data;
};
//get all categories
export const fetchCategories = async () => {
  const query = `*[_type == "category"]{
    ...
  }`;
  const data = await sanityFetch<IPostCategory[]>({
    query,
    tags: ["category"],
  });

  return data;
};

//get gallerypage
export const fetchGalleryPageContent = async () => {
  const query = `*[_type == "galleryPage"][0]{
    ...,
  }`;
  const data = await sanityFetch<IGalleryPage>({
    query,
    tags: ["galleryPage"],
  });

  return data;
};
//get all galleries
export const fetchGalleries = async () => {
  const query = `*[_type == "gallery"]{
    ...
  }`;
  const data = await sanityFetch<IGallery[]>({
    query,
    tags: ["gallery"],
  });

  return data;
};
export const fetchGalleryById = async (id: string) => {
  const query = `*[_type == "gallery" && _id == "${id}"][0]{
    ...,
  }`;
  const data = await sanityFetch<IGallery>({
    query,
    tags: ["gallery"],
  });

  return data;
};

//get authors
export const fetchAuthors = async () => {
  const query = `*[_type == "author"]{
    ...
  }`;
  const data = await sanityFetch<IAuthor[]>({
    query,
    tags: ["author"],
  });

  return data;
};

//get author by slug
export const fetchAuthorBySlug = async (slug: string) => {
  const query = `*[_type == "author" && slug.current == "${slug}"][0]{
    ...
  }`;
  const data = await sanityFetch<IAuthor>({
    query,
    tags: ["author"],
  });

  return data;
};

//get blogs by author
export const fetchBlogsByAuthor = async (id: string) => {
  const query = `*[_type == "post" && author._ref == "${id}"]{
    ...,
    author->{...},
    categories[]->{...},
  }`;
  const data = await sanityFetch<IPost[]>({
    query,
    tags: ["post"],
  });

  return data;
};
