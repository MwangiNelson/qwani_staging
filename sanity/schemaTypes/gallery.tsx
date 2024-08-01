export default {
  name: "gallery",
  title: "Single Gallery",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Gallery Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
    },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
