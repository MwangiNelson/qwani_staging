import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(10)
          .max(80),
    },
    //slug
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    },
    //payment link
    {
      name: "paymentLink",
      title: "Payment Link",
      type: "url",
    },

    {
      name: "time",
      title: "Time",
      type: "string",
      validation: (rule) => rule.required(),
    },

    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.min(0),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    defineField({
      name: "county",
      title: "County",
      description: "Qwani Nairobi,Eldoret or Mombasa",
      type: "reference",
      to: { type: "location" },
    }),
    //google maps link
    {
      name: "googleMapsLink",
      title: "Google Maps Link",
      type: "url",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (rule) => rule.max(200),
    },
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    //gallery
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
      };
    },
  },
});
