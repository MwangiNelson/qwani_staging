import { defineField, defineType } from "sanity";

export default defineType({
  name: "publicationsPage",
  title: "Publications Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    // Publications Section
    defineField({
      name: "publicationsTitle",
      title: "Publications Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publications",
      title: "Publications",
      type: "array",

      of: [
        {
          type: "reference",
          to: [{ type: "publication" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
      };
    },
  },
});
