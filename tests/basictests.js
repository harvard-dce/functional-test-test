var test = require('tape');

var Nemo = require('nemo');

var nemo = Nemo(
  {
    'driver': {
      browser: 'chrome'
    },
    'data': {
      baseUrl: 'https://matterhorn.dce.harvard.edu/engage/player/watch.html?id=27991b44-0f9b-4ac7-9a23-0728d93c8e5e'
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
  runTests
);

function runTests(error) {
  if (error) {
    console.log('Error during Nemo setup', err);
    return;
  }

  test('Basic test', function basicTest(t) {
    t.plan(1);

    nemo.driver.get(nemo.data.baseUrl);
    nemo.driver.getCapabilities().then(useCapabilities);

    function useCapabilities(caps) {
      console.info("Nemo successfully launched", caps.caps_.browserName);
      setTimeout(goToLecture6HD, 6000);
    }

    function goToLecture6HD() {
      console.log('hey');
      var link = nemo.view._find('css:.playButtonOnScreenIcon');
      link.click();
      nemo.driver.sleep(2000);

      var mainVideo = nemo.view._present(
        'css:#playerContainer_videoContainer_1'
      )
      .then(checkPresent);
    }

    function checkPresent(isPresent) {
      t.ok(isPresent, 'Main video element is added.');
      nemo.driver.quit();
    }    
  });
}


// 