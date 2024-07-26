import { client } from "@/sanity/lib/client";
import { IAboutPage, IEvent, IHomePage, ISeo } from "@/utils/data_types";
import next from "next";

export const fetchSeo = async (page: string): Promise<ISeo> => {
  const query = `*[_type == "seo" && page == "${page}"][0]`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["seo"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};
export const fetchBlogs = async () => {
  const query = `*[_type == "post"]{
   ...,
    author->{name, image},
    categories[]->{title},
   
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["blogs"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};

export const getHomePageContent = async (): Promise<IHomePage> => {
  const query = `*[_type == "home"][0]{
    ...,
    events[]->{...},
    blogs[]->{...},
    
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["homepage"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};

//about page
export const fetchAboutPageContent = async (): Promise<IAboutPage> => {
  const query = `*[_type == "about"][0]{
    ...,
     teamMembers[]->{...},
    
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      cache: "no-cache",
      next: {
        tags: ["aboutpage"],
        // revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};

export const fetchEvents = async (): Promise<IEvent[]> => {
  const query = `*[_type == "event"]{
    ...
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["events"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};

//upcoming events
export const fetchUpcomingEvents = async (): Promise<IEvent[]> => {
  const query = `*[_type == "event" && date > now()]{
    ...
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["upcomingevents"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};
//get event by id
export const fetchEventById = async (id: string): Promise<IEvent> => {
  const query = `*[_type == "event" && _id == "${id}"][0]{
    ...
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      // cache: "no-cache",
      next: {
        tags: ["event"],
        revalidate: 3600 * 24 * 30,
      },
    }
  );
  return data;
};
