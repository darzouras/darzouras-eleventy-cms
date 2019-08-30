const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

    // Date formatting (human readable)
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
    });

    // Date formatting (machine readable)
    eleventyConfig.addFilter("machineDate", dateObj => {
        return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
    });

    // markdown plugins
    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };
    let opts = {
        permalink: false
    };

    // only content in the `posts/` directory
    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getAllSorted().filter(function (item) {
            return item.inputPath.match(/^\.\/posts\//) !== null;
        });
    });

    // prevents processing folders with static assets
    eleventyConfig.addPassthroughCopy("static/img");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("_includes/assets/");
    eleventyConfig.addPassthroughCopy("sw.js");
    eleventyConfig.addPassthroughCopy("manifest.json");

    return {
        templateFormats: ["md", "njk", "html", "liquid"],

        pathPrefix: "/",

        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true,
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};