import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),

    defineField({
      name: "heroBlog",
      title: "Hero Blog",
      type: "reference",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "heroBlogs",
      title: "Hero Blogs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    }),

    defineField({
      name: "trendingTitle",
      title: "Trending Title",
      type: "string",
    }),
    defineField({
      name: "trendingBlogs",
      title: "Trending Blogs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
    },
    prepare(selection) {
      return {
        title: selection.title,
      };
    },
  },
});
