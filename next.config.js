module.exports = {
  async redirects() {
    return [
      {
        source: '/playground',
        destination: '/playground/1',
        permanent: true,
      },
    ];
  },
};
