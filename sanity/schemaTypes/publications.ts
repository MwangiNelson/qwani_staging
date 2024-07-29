import { defineField, defineType } from "sanity";

export default defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    //slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "buyLink",
      title: "Buy Link",
      type: "url",
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredWriters",
      title: "Featured Writers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "writer" }],
        },
      ],
    }),
  ],
});
