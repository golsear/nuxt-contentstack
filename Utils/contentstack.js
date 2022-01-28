import * as contentstack from "contentstack";
import * as Utils from "@contentstack/utils";

  const Stack = contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    region: process.env.CONTENTSTACK_REGION ? process.env.CONTENTSTACK_REGION : "us",
  });

  const renderOption = {
    ["span"]: (node, next) => {
      return next(node.children);
    },
  };

  export default {
    /**
     *
     * fetches all the entries from specific content-type
     * @param {* content-type uid} contentTypeUid
     * @param {* reference field name} referenceFieldPath
     * @param {* Json RTE path} jsonRtePath
     *
     */
     getEntries({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
      return new Promise((resolve, reject) => {
        const query = Stack.ContentType(contentTypeUid).Query();
        if (referenceFieldPath) query.includeReference(referenceFieldPath);
        query
          .includeOwner()
          .toJSON()
          .find()
          .then(
            (result) => {
              jsonRtePath &&
                Utils.jsonToHTML({
                  entry: result,
                  paths: jsonRtePath,
                  renderOption,
                });
              resolve(result[0]);
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
  
    /**
     *fetches specific entry from a content-type
     *
     * @param {* content-type uid} contentTypeUid
     * @param {* url for entry to be fetched} entryUrl
     * @param {* reference field name} referenceFieldPath
     * @param {* Json RTE path} jsonRtePath
     * @returns
     */
    getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }) {
      return new Promise((resolve, reject) => {
        const blogQuery = Stack.ContentType(contentTypeUid).Query();
        if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
        blogQuery.includeOwner().toJSON();
        const data = blogQuery.where("url", `${entryUrl}`).find();
        data.then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result[0]);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    /**
     *fetches specific entry from a content-type
     *
     * @param {* content-type uid} contentTypeUid
     * @param {* url for entry to be fetched} entryUrl
     * @param {* reference field name} referenceFieldPath
     * @param {* Json RTE path} jsonRtePath
     * @returns
     */
     getEntryByUid({ contentTypeUid, entryUid, referenceFieldPath, jsonRtePath }) {
      return new Promise((resolve, reject) => {
        const blogQuery = Stack.ContentType(contentTypeUid).Query();
        if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
        blogQuery.includeOwner().toJSON();
        const data = blogQuery.where("uid", `${entryUid}`).find();
        data.then(
          (result) => {console.log('RESULT', result);
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result[0]);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  };

  
