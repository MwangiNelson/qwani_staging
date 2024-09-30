"use client";
import { PortableText } from "next-sanity";
import React from "react";
import { myPortableTextComponents } from "../utils/sanity_components";
import { TypedObject } from "sanity";

const Portable_Text_Editor = ({
  body,
}: {
  body: TypedObject | TypedObject[];
}) => {
  return (
    <div className="prose">
      <PortableText value={body} components={myPortableTextComponents} />
    </div>
  );
};

export default Portable_Text_Editor;
