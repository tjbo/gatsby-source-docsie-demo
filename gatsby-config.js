module.exports = {
  siteMetadata: {
    title: `Gatsby Source Docsie Demo`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      // including a plugin from outside the plugins folder needs the path to it (for DEV)
      resolve: require.resolve(`../gatsby-source-docsie`),
      options: {
        // deploymentId: "dafasdf3wfsa",
        path: "docs2",
      },
      // htmlSerializer: optional (),
    },
  ],
}
