import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blogs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      //make sure the slug is unique
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    //excerpt field
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .max(200)
          .warning("Shorter is better"),
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Blog Post", value: "blog" },
          { title: "Comic", value: "comic" },
        ],
        layout: "radio",
      },
      initialValue: "blog",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      hidden: ({ parent }) => parent?.postType !== "blog",
    }),
    defineField({
      name: "comicContent",
      title: "Comic Content",
      type: "comicContent",
      hidden: ({ parent }) => parent?.postType !== "comic",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      postType: "postType",
    },
    prepare(selection) {
      const { author, postType } = selection;
      const typeLabel = postType === "comic" ? "Comic" : "Blog";
      return {
        ...selection,
        subtitle: author && `by ${author} • ${typeLabel}`,
      };
    },
  },
});
