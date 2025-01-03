"use client";
import { PortableText } from "next-sanity";
import React from "react";
import { myPortableTextComponents } from "../utils/sanity_components";
import { TypedObject } from "sanity";
import { cn } from "@/lib/utils";
import { type ClassValue, clsx } from "clsx"
import {toHTML} from '@portabletext/to-html'

const Portable_Text_Editor = ({
  body,
  classNames,
}: {
  body: TypedObject | TypedObject[];
  classNames?: ClassValue
}) => {
  return (
    <div className={cn(`prose`, classNames)}>
      <PortableText value={body} components={myPortableTextComponents} />
    </div>
  );
};

export default Portable_Text_Editor;

export const portable_text_to_html = (body: TypedObject | TypedObject[]) => {
  return  toHTML(body, {
    components: {
      
    },
  })
}
