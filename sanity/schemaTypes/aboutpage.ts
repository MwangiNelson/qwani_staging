import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About Us Page",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // About Section
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Section Description",
      type: "text",
    }),

    // Statistics Section
    defineField({
      name: "statistics",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "number", title: "Number", type: "number" },
          ],
        },
      ],
    }),

    // Values Section
    defineField({
      name: "valuesTitle",
      title: "Values Section Title",
      type: "string",
    }),
    defineField({
      name: "valuesDescription",
      title: "Values Section Description",
      type: "text",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),

    // Team Section
    defineField({
      name: "teamTitle",
      title: "Team Section Title",
      type: "string",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "team" }],
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
