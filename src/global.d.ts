/**
 * Tell TypeScript we'll be importing some scss files and other assets.
 */
declare module "*.scss"
declare module "*.jpg"
declare module "*.svg"

// From webpack's DefinePlugin.
declare const IS_PRODUCTION: boolean;
