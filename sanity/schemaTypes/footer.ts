import { defineField, defineType } from "sanity";

export default defineType({
  name: "communityPage",
  title: "Community Page",
  type: "document",
  fields: [
    defineField({
      name: "joinCommunityTitle",
      title: "Join Community Title",
      type: "string",
    }),
    defineField({
      name: "joinCommunityDescription",
      title: "Join Community Description",
      type: "text",
    }),
    defineField({
      name: "joinCommunityButtonText",
      title: "Join Community Button Text",
      type: "string",
    }),
    defineField({
      name: "joinCommunityButtonLink",
      title: "Join Community Button Link",
      type: "url",
    }),

    // Video Section
    defineField({
      name: "videoImage",
      title: "Video Image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "joinCommunityTitle",
    },
    prepare(selection) {
      return {
        title: selection.title,
      };
    },
  },
});
