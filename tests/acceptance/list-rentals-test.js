import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('should redirect to rentals route', function (assert){
  visit('/'); //Load route specific for given URL
  //andThen waits for all test helpers before executing function
  //In this case we wait for page to load after visit
  andThen(function(){ 
    //currentURL() returns URL test is currently visiting
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });
});

//Visit index route and make sure result shows 3 listings
//Test assumes each rental will have a CSS class called listing
test('should list available rentals', function (assert){
  visit('/');
  andThen(function(){
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  });
});

//Verify clicking about successfully loads correct URL
//Click helper simulates a user clicking these links
test('should link to information about the company', function (assert){
  visit('/'); //load index page
  click('a:contains("About")'); //click About link
  andThen(function(){
    assert.equal(currentURL(), '/about', 'should navigate to about'); //verify /about URL is loaded
  });
});

test('should link to contact information', function (assert){
  visit('/');
  click('a:contains("Contact")');
  andThen(function(){
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

//Fill out Seattle as search criteria and assert that 1 is returned
test('should filter the list of rentals by city', function (assert){
  visit('/');
  fillIn('.list-filter input', 'seattle'); //Fill In 'seattle' in the input field .list-filter
  keyEvent('.list-filter input', 'keyup', 69); //simulate the keyEvent filtering action(e.g submit click)
  andThen(function(){
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  });
});

//Click specifc rental and load detailed view of the page
//Click on title and validate that an expanded description is shown
test('should show details for a specific rental', function (assert){
  visit('/rentals');
  click('a:contains("Grand Old Mansion")');
  andThen(function(){
    assert.equal(currentURL(), '/rentals/grand-old-mansion', 'should navigate to show route');
    assert.equal(find('.show-listing h2').text(), "Grand Old Mansion", "should list rental title");
    assert.equal(find('description').length, 1, 'shoudl list a description of the property');
  });
});









