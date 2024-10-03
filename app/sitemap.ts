import {
  fetchBlogs,
  fetchEvents,
  fetchGalleries,
  fetchPublicationPage,
  fetchWriters,
} from "@/lib/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const blogs = await fetchBlogs();
  const events = await fetchEvents();
  const writers = await fetchWriters();
  const publicationPage = await fetchPublicationPage();
  const galleries = await fetchGalleries();

  const baseUrl = "https://qwani.co.ke";

  // Static routes with priorities
  const routes = [
    { route: "", priority: 1.0 },
    { route: "/about", priority: 0.8 },
    { route: "/events", priority: 0.8 },
    { route: "/writers", priority: 0.8 },
    { route: "/blogs", priority: 0.8 },
    { route: "/publications", priority: 0.8 },
    { route: "/gallery", priority: 0.8 },
    { route: "/contact", priority: 0.7 },
    { route: "/contributers", priority: 0.7 },
    { route: "/blogs/how-to-publish-with-qwani", priority: 0.6 },
    { route: "/blogs/how-it-started", priority: 0.6 },
    { route: "/blogs/how-it-went", priority: 0.6 },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date().toISOString(),
    priority: item.priority,
  }));

  // Dynamic routes
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug.current}`,
    lastModified: new Date(blog._updatedAt).toISOString(),
    priority: 0.64,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug.current}`,
    lastModified: new Date(event._updatedAt).toISOString(),
    priority: 0.64,
  }));

  const writerRoutes = writers.map((writer) => ({
    url: `${baseUrl}/writers/${writer.slug.current}`,
    lastModified: new Date(writer._updatedAt).toISOString(),
    priority: 0.64,
  }));

  const publicationRoutes = publicationPage.publications.map((publication) => ({
    url: `${baseUrl}/publications/${publication.slug.current}`,
    lastModified: new Date(publication._updatedAt).toISOString(),
    priority: 0.64,
  }));

  // const galleryRoutes = galleries.map((gallery) => ({
  //   url: `${baseUrl}/gallery/${gallery.slug.current}`,
  //   lastModified: new Date(gallery._updatedAt).toISOString(),
  //   priority: 0.64,
  // }));

  return [
    ...routes,
    ...blogRoutes,
    ...eventRoutes,
    ...writerRoutes,
    ...publicationRoutes,
    // ...galleryRoutes,
  ];
}
