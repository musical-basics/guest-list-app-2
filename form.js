// form.js

document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var form = document.getElementById('guestListForm');

  // Add form submission event listener
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get the current timestamp in PST
    var now = new Date();
    var timestamp = now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

    // Get form values
    var firstName = document.getElementById('firstName').value;
    var secondName = document.getElementById('secondName').value;
    var maleCount = parseInt(document.getElementById('maleCount').value);
    var femaleCount = parseInt(document.getElementById('femaleCount').value);
    var phone1 = document.getElementById('phone1').value;
    var phone2 = document.getElementById('phone2').value;
    var tonightClubs = Array.from(document.querySelectorAll('input[name="tonightClubs"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });
    var tomorrowPools = Array.from(document.querySelectorAll('input[name="tomorrowPools"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });
    var tomorrowNightClubs = Array.from(document.querySelectorAll('input[name="tomorrowNightClubs"]:checked')).map(function(checkbox) {
      return checkbox.value;
    });
    var hotel = document.getElementById('hotel').value;
    var otherHotel = document.getElementById('otherHotel').value.trim();
    var dateLeaving = document.getElementById('dateLeaving').value;

    // Create Group instance
    var group = new Group(maleCount, femaleCount, hotel === 'Other' ? otherHotel : hotel);

    // Create Guest instances
    var guests = [];
    if (firstName !== '') {
      guests.push(new Guest(firstName, phone1, group));
    }
    if (secondName !== '') {
      guests.push(new Guest(secondName, phone2, group));
    }

    // Create Venue instances
    var venues = [
      new Venue('Marquee', []),
      new Venue('Omnia', []),
      new Venue('Hakkasan', []),
      new Venue('Jewel', []),
      new Venue('Tao', []),
      new Venue('Wet Republic', []),
      new Venue('Tao Beach', []),
      new Venue('Marquee Dayclub', []),
      new Venue('Liquid', [])
    ];

    // Create Event instances for tonight clubs
    var tonightEvents = tonightClubs.map(function(club) {
      var venue = venues.find(function(venue) {
        return venue.name === club;
      });
      return new Event(new Date(), '', venue, '');
    });

    // Create Event instances for tomorrow pools
    var tomorrowPoolEvents = tomorrowPools.map(function(pool) {
      var venue = venues.find(function(venue) {
        return venue.name === pool;
      });
      return new Event(new Date(), '', venue, '');
    });

    // Create Event instances for tomorrow night clubs
    var tomorrowNightEvents = tomorrowNightClubs.map(function(club) {
      var venue = venues.find(function(venue) {
        return venue.name === club;
      });
      return new Event(new Date(), '', venue, '');
    });

    // Create Ticket instances
    var tickets = [];
    guests.forEach(function(guest) {
      tonightEvents.forEach(function(event) {
        tickets.push(new Ticket(guest, event));
      });
      tomorrowPoolEvents.forEach(function(event) {
        tickets.push(new Ticket(guest, event));
      });
      tomorrowNightEvents.forEach(function(event) {
        tickets.push(new Ticket(guest, event));
      });
    });

    // Save the form data to Firebase
    var formData = {
      timestamp: timestamp,
      group: group,
      guests: guests,
      tonightEvents: tonightEvents,
      tomorrowPoolEvents: tomorrowPoolEvents,
      tomorrowNightEvents: tomorrowNightEvents,
      tickets: tickets,
      dateLeaving: dateLeaving,
      exportedStatus: false
    };

    firebase.database().ref('guestList').push(formData)
      .then(function() {
        console.log('Data saved successfully!');
        form.reset(); // Reset the form
      })
      .catch(function(error) {
        console.error('Error saving data:', error);
      });
  });
});