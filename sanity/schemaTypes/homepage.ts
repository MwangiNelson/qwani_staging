import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
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
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroButtonText",
      title: "Hero Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroButtonLink",
      title: "Hero Button Link",
      type: "url",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    // About Section
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutDescription",
      title: "About Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    // Literary Voices Unleashed Section
    defineField({
      name: "about2Title",
      title: "About2 Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about2description",
      title: "About2 Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    // Highlights Section
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    // Events Section
    defineField({
      name: "eventsTitle",
      title: "Events Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    //events description
    defineField({
      name: "eventsDescription",
      title: "Events Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "array",
      of: [{ type: "reference", to: { type: "event" } }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "graySectionTitle",
      title: "Gray Section Title",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    // Blogs Section
    defineField({
      name: "blogsTitle",
      title: "Blogs Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogs",
      title: "Blogs",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "reference", to: { type: "post" } }],
    }),
  ],
  preview: {
    select: {
      title: "heroTitle",
      media: "heroImage",
    },
    prepare(selection) {
      return {
        title: "Home Page",
        media: selection.media,
      };
    },
  },
});
