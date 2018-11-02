const yaml = require('js-yaml')
const fs = require('fs')
const assert = require('chai').assert
const url = require('url')

describe('communities', function() {
  before('test communities.yaml load', function() {
    communities = yaml.safeLoad(fs.readFileSync('communities.yaml', 'utf8'))
  })

  it('test community schema', function() {
    communities.forEach(function(community){
      // name
      assert.ok(community.hasOwnProperty('name'), `${community.url} must have a name`)
      assert.equal(typeof community.name, 'string', `${community.name} name must be string`)

      // lat
      assert.ok(community.hasOwnProperty('lat'), `${community.name} must have a lat`)
      assert.typeOf(community.lat, 'number', `${community.name} lat must be a number`)

      // lng
      assert.ok(community.hasOwnProperty('lng'), `${community.name} must have a lng`)
      assert.typeOf(community.lng, 'number', `${community.name} lng must be a number`)

      // url
      assert.ok(community.hasOwnProperty('url'), `${community.name} must have a url`)
      assert.typeOf(community.url, 'string', `${community.name} url must be a string`)
      assert.ok(new url.URL(community.url), `${community.name} url is invalid`)
      
      // logo
      if (community.hasOwnProperty('logo') !== undefined) {
        assert.typeOf(community.url, 'string', `${community.name} url must be a string`)
      }
    })
  })

  it ('all communities should have an unique pair of lat and lng', function() {
    communities.forEach(function(currentCommunity){
      communities.forEach(function(checkCommunity){
        if (currentCommunity.name != checkCommunity.name) {
          assert.notDeepEqual(
            {lat: currentCommunity.lat, lng: currentCommunity.lng},
            {lat: checkCommunity.lat, lng: checkCommunity.lng},
            `${currentCommunity.name} and ${checkCommunity.name} has the same lat and long`
          )
        }
      })
    })
  })
})
