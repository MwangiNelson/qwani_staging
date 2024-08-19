import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    //role
    //slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "tiktok", title: "TikTok", type: "url" },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      validation: (Rule) => Rule.required(),
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
      };
    },
  },
});
