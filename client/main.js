import { Template } from "meteor/templating";
import "./main.html";
import { Notes } from "../lib/collections";
import { Meteor } from "meteor/meteor";

// Authentications
import { Accounts } from "meteor/accounts-base";
//Account Config (Configuratipon to Login and Sing-up with Username and not Email way)
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Template.body.helpers({
  notes() {
    return Notes.find();
  }
});

Template.add.events({
  "submit .add-form": function() {
    event.preventDefault();
    // Get input value
    const text = event.target.text.value;

    /* //Insert note into collection
    Notes.insert({
      text, //text: text (Is the Same),
      createdAt: new Date(),
      // Owner
      owner: Meteor.userId(),
      username: Meteor.user().username
    }); */
    Meteor.call("notes.insert", text);

    // Clear input text
    event.target.text.value = "";

    //close  Modal
    $("#addModal").modal("close");
    return false;
  }
});

Template.note.events({
  "click .delete-note": function() {
    /* console.log(this);
    event.preventDefault();
    Notes.remove(this._id); */
    Meteor.call("notes.remove", this);
    return false;
  }
});
