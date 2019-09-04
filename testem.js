module.exports = {
  test_page: 'tests/index.html?hidepassed',
  parallel: -1,
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_start_timeout: 200,
  browser_disconnect_timeout: 50,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
        '--incognito',
        '--no-sandbox',
        '--disable-software-rasterizer'
      ].filter(Boolean)
    }
  }
};
