import { client, sanityFetch } from "@/sanity/lib/client";
import {
  IAboutPage,
  IEvent,
  IHomePage,
  IPost,
  IPublicationsPage,
  ISeo,
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
    author->{name, image},
    categories[]->{title},
   
  }`;
  const data = await sanityFetch({
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

export const fetchPublicationPage = async () => {
  const query = `*[_type == "publicationsPage"][0]{
    ...,
    publications[]->{...},
  }`;
  const data = await sanityFetch<IPublicationsPage>({
    query,
    tags: ["publicationsPage"],
  });

  return data;
};
