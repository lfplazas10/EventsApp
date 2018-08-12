package controllers;

import controllers.base.BaseController;
import models.Event;
import play.mvc.Result;

public class EventController extends BaseController {

    public Result createEvent() {
        try {
            String user = session("connected");
            if (user == null)
                return unauthorized();

            Event event = bodyAs(Event.class);
            event.setOwnerEmail(user);
            event.save();
            return ok(event);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result deleteEvent(Long eventId) {
        try {
            String user = session("connected");
            if (user == null)
                return unauthorized();
            if (!Event.find().byId(eventId).getOwnerEmail().equals(user))
                throw new Exception("The user does not own the event");

            Event.find().deleteById(eventId);
            return ok(eventId);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result getEvents() {
        try {
            String user = session("connected");
            return ok(Event.find().query().where().eq("owner_email", user).orderBy("creation_date desc").findList());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

}

