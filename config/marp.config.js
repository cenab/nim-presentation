const markdownItKroki = require('@kazumatu981/markdown-it-kroki');

module.exports = {
  engine: ({ marp }) => {
    // Enable HTML for <br> tags and other raw HTML if needed in Markdown
    marp.options.html = true;
    marp.use(markdownItKroki, { /* options for markdown-it-kroki if needed */ });
    return marp;
  }
}; 