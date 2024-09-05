import { defineField, defineType } from "sanity";

export default defineType({
  name: "contributersPage",
  title: "Contributers Page",
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
    defineField({
      name: "post",
      title: "Publishing With Qwani Blog",
      type: "reference",
      to: { type: "post" },
      validation: (Rule) => Rule.required(),
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
