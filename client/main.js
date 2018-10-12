import { Template } from "meteor/templating";
import "./main.html";
import { Notes } from "../lib/collections";

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

    //Insert note into collection
    Notes.insert({
      text, //text: text (Is the Same),
      createdAt: new Date()
    });

    // Clear input text
    event.target.text.value = "";

    //close  Modal
    $("#addModal").modal("close");
    return false;
  }
});

Template.note.events({
  "click .delete-note": function() {
    console.log(this);
    event.preventDefault();
    Notes.remove(this._id);
  }
});
