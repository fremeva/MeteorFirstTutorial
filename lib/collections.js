import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Notes = new Mongo.Collection("notes");

Meteor.methods({
  "notes.insert"(text) {
    check(text, String);
    // Check if User is Looged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("No Authorized");
    }

    //Insert note into collection
    Notes.insert({
      text, //text: text (Is the Same),
      createdAt: new Date(),
      // Owner
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  "notes.remove"(note) {
    check(note._id, String);
    Notes.remove(note._id);
  }
});
