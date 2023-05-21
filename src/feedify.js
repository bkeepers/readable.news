const { toXML } = require('jstoxml');

module.exports = (articles) => {
  const feed = {
    _name: 'rss',
    _attrs: {
        version: '2.0'
    },
    _content: {
      channel: [
        { title: "Hacker News Feed" },
        // { link: "" },
        // { description: "" },
        { language: "en-US" },
        ...articles
      ]
    },
  };

  return toXML(feed, { header: true, indent: '  ' })
}
