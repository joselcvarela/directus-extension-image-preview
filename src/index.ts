import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "directus-extension-image-preview",
  name: "Image Preview",
  icon: "image",
  description: "Preview image using URLs",
  component: InterfaceComponent,
  options({ collection }) {
    return [
      {
        field: "fieldSrc",
        name: "Source",
        type: "string",
        meta: {
          width: "full",
          interface: "system-display-template",
          options: {
            collectionName: collection,
          },
        },
      },
      {
        field: "fieldAlt",
        name: "Alternative Text",
        type: "string",
        meta: {
          interface: "system-display-template",
          width: "full",
          options: {
            collectionName: collection,
          },
        },
      },
      {
        field: "fieldWidth",
        name: "Width",
        type: "string",
        meta: {
          interface: "input",
          width: "half",
        },
      },
      {
        field: "fieldHeight",
        name: "Height",
        type: "string",
        meta: {
          interface: "input",
          width: "half",
        },
      },
      {
        field: "fieldFit",
        name: "Fit",
        type: "string",
        meta: {
          interface: "select-dropdown",
          options: {
            choices: [
              {
                text: "Fill",
                value: "fill",
              },
              {
                text: "Cover",
                value: "cover",
              },
              {
                text: "Contain",
                value: "contain",
              },
              {
                text: "Scale Down",
                value: "scale-down",
              },
            ],
          },
          width: "full",
          schema: {
            default_value: "contain",
          },
        },
      },
    ];
  },
  types: ["alias"],
  localTypes: ["presentation"],
  group: "presentation",
});
