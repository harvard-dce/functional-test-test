var Nemo = require('nemo');

var nemo = Nemo(
  {
    'driver': {
      browser: 'chrome'
    },
    'data': {
      baseUrl: 'http://matterhorn.dce.harvard.edu/engage/ui/index.html#/2015/03/33175'
    },
    "plugins": {
      "view": {
        "module": "nemo-view",
        "arguments": ["path:locator"]
      },
      "screenshot": {
        "module": "nemo-screenshot",
        "arguments": ["path:report", ["click", "exception"]]
      }
    }
  },
  runTest
);

function runTest(error) {
  if (error) {
    console.log('Error during Nemo setup', err);
  }
  nemo.driver.get(nemo.data.baseUrl);
  nemo.driver.getCapabilities().then(useCapabilities);

  function useCapabilities(caps) {
    console.info("Nemo successfully launched", caps.caps_.browserName);
    setTimeout(goToLecture6HD, 1000);
  }

  function goToLecture6HD() {
    // nemo.view
    console.log('hey');
    debugger;
    // console.log(nemo.view);
    var link = nemo.view._find('css:a[href="https://matterhorn.dce.harvard.edu/engage/player/watch.html?id=1ec2b8a9-12a0-4b68-a0fe-94f853668b9a"]');
    link.click();
    nemo.driver.sleep(3000);
    nemo.driver.quit();
  }
}
