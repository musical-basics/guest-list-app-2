// classes.js

class Guest {
  constructor(fullName, phoneNumber, group) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.group = group;
  }
}

class Group {
  constructor(numMales, numFemales, hotel) {
    this.numMales = numMales;
    this.numFemales = numFemales;
    this.hotel = hotel;
    this.size = numMales + numFemales;
  }
}

class Venue {
  constructor(name, events) {
    this.name = name;
    this.events = events;
  }
}

class Event {
  constructor(date, artist, venue, rules) {
    this.date = date;
    this.artist = artist;
    this.venue = venue;
    this.rules = rules;
  }
}

class Ticket {
  constructor(guest, event) {
    this.guest = guest;
    this.event = event;
    this.artist = event.artist;
    this.venue = event.venue;
    this.rules = event.rules;
    this.fullName = guest.fullName;
    this.groupSize = guest.group.size;
  }
}