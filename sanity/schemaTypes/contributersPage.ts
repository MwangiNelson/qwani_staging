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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "btnText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "post",
      title: "Publishing With Qwani Blog",
      type: "reference",
      to: { type: "post" },
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
