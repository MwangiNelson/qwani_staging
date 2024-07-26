import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "Seo",
  type: "document",
  fields: [
    //page
    defineField({
      name: "page",
      title: "Page",
      type: "string",

      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Events", value: "events" },
          { title: "Writers", value: "writers" },
          { title: "Blogs", value: "blogs" },
          { title: "Publications", value: "publications" },
          { title: "Contact", value: "contact" },
          // Add more pages as needed
        ],
      },
    }),
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description:
        "This is the title that will appear in search engines and social media shares",

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      description:
        "A brief description of the page content for search engines and social media",
      validation: (Rule) =>
        Rule.max(160).warning(
          "SEO descriptions are usually under 160 characters"
        ),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Add keywords that describe the content",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description:
        "This image will be used for social media shares. Ideal size is 1200x630 pixels",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description:
        "Specify a different title for social media, if left blank SEO Title will be used",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      description:
        "Specify a different description for social media, if left blank SEO Description will be used",
    }),
    defineField({
      name: "twitterCardType",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
        ],
      },
      description:
        "Choose how your content should appear when shared on Twitter",
    }),
  ],
  preview: {
    select: {
      title: "title",
      page: "page",

      media: "ogImage",
    },
    prepare(selection) {
      const { title, page } = selection;
      return {
        title: page,
        subtitle: title,
        media: selection.media,
      };
    },
  },
});
