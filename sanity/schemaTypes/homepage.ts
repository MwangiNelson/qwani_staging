import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "HomePage",
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
      name: "heroButtonText",
      title: "Hero Button Text",
      type: "string",
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
      options: {
        hotspot: true,
      },
    }),

    // About Section
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Description",
      type: "text",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    // Literary Voices Unleashed Section
    defineField({
      name: "about2Title",
      title: "About2 Title",
      type: "string",
    }),
    defineField({
      name: "about2description",
      title: "About2 Description",
      type: "text",
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
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
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
    }),
    //events description
    defineField({
      name: "eventsDescription",
      title: "Events Description",
      type: "string",
    }),
    defineField({
      name: "events",
      title: "Events",
      type: "array",
      of: [{ type: "reference", to: { type: "event" } }],
    }),

    defineField({
      name: "graySectionTitle",
      title: "Gray Section Title",
      type: "text",
    }),
    // Blogs Section
    defineField({
      name: "blogsTitle",
      title: "Blogs Title",
      type: "string",
    }),
    defineField({
      name: "blogs",
      title: "Blogs",
      type: "array",
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
