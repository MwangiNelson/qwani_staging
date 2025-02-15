import { defineField, defineType } from "sanity";

export default defineType({
  name: "how_it_started",
  title: "How It Started",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    //hero images
    defineField({
      name: "hero_images",
      title: "Hero Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    //content, b
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    ///images
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
