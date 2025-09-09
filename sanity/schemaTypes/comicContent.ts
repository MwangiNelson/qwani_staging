import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: "Comic Content",
  name: "comicContent",
  type: "array",
  options: {
    sortable: true,
    layout: "grid",
  },
  of: [
    defineArrayMember({
      title: "Comic Panel",
      type: "object",
      name: "comicPanel",
      fields: [
        {
          name: "image",
          title: "Panel Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description:
                "Describe what's happening in this panel for accessibility",
            },
          ],
        },
        {
          name: "caption",
          title: "Panel Caption",
          type: "text",
          description: "Optional caption or dialogue for this panel",
        },
      ],
      preview: {
        select: {
          title: "caption",
          media: "image",
        },
        prepare(selection) {
          const { title, media } = selection;
          return {
            title: title || "Panel",
            media,
            subtitle: "Comic Panel",
          };
        },
      },
    }),
  ],
});
