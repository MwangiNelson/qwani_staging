import { defineField, defineType } from "sanity";

export default defineType({
  name: "writersPage",
  title: "Writers Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
    }),

    // Call to Action
    defineField({
      name: "ctaText",
      title: "Call to Action Text",
      type: "string",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "Call to Action Button Link",
      type: "url",
    }),

    // Writers Section
    defineField({
      name: "writersTitle",
      title: "Writers Section Title",
      type: "string",
    }),
    defineField({
      name: "writers",
      title: "Writers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "writer" }],
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
